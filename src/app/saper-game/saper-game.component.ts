import { Component, OnInit } from '@angular/core';
import { Field, FieldState } from 'src/data-types/Field';

@Component({
  selector: 'app-saper-game',
  templateUrl: './saper-game.component.html',
  styleUrls: ['./saper-game.component.scss']
})
export class SaperGameComponent implements OnInit
{
	public boardWidth = 5;
	public boardHeight = 5;
	public minesCount = 5;

	private board: Field[] = [];


	constructor(){ }

	ngOnInit()
	{
		this.generateBoard();
	}

	private generateBoard()
	{
		// Generate mines:
		for ( let i = 0; i < this.minesCount; i++ )
		{
			do
			{
				const fieldX = this.getRandomValue( 0, this.boardWidth - 1 ),
					fieldY = this.getRandomValue( 0, this.boardHeight - 1 );

				if ( this.getFieldAt( fieldX, fieldY ) )
					continue;

				this.board.push( new Field( {
					x: fieldX,
					y: fieldY,
					isMine: true
				} ) );

				break;
			}
			while ( true );
		}

		// Generate rest of the board:
		const boardNumbers: Field[] = [];

		for ( let x = 0; x < this.boardWidth; x++ )
		{
			for ( let y = 0; y < this.boardHeight; y++ )
			{
				if ( this.getFieldAt( x, y ) )
					continue;

				boardNumbers.push( new Field( {
					x: x,
					y: y,
					value: this.getBombsCountAround( x, y )
				} ) );
			}
		}

		this.board.push( ...boardNumbers );
	}


	private getRandomValue( min: number, max: number )
	{
		return Math.round( Math.random() * ( max - min ) + min );
	}


	private getFieldAt( x: number, y: number ): Field | undefined
	{
		return this.board.find( ( v: Field ) => v.x == x && v.y == y );
	}


	private getBombsCountAround( x: number, y: number, range: number = 1 ): number
	{
		let bombsCount = 0;

		for ( let field of this.board )
		{
			if ( field.isMine
				&& Math.abs( field.x - x ) <= range
				&& Math.abs( field.y - y ) <= range )
				bombsCount++;
		}


		return bombsCount;
	}


	public onFieldClick( field: Field )
	{
		field.state = FieldState.DISPLAYED;
	}
}
