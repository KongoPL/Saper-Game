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
		this.board = [];

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


	public displayField( field: Field )
	{
		if ( field.isDisplayed() )
			return;

		field.state = FieldState.DISPLAYED;

		this.tryToEndGame();

		if ( !field.isEmpty() )
			return;

		const fields = [
			this.getFieldAt( field.x - 1, field.y - 1 ),
			this.getFieldAt( field.x, field.y - 1 ),
			this.getFieldAt( field.x + 1, field.y - 1 ),

			this.getFieldAt( field.x - 1, field.y ),
			this.getFieldAt( field.x + 1, field.y ),

			this.getFieldAt( field.x - 1, field.y + 1 ),
			this.getFieldAt( field.x, field.y + 1 ),
			this.getFieldAt( field.x + 1, field.y + 1 )
		];

		for ( field of fields )
		{
			if ( !field || field.isDisplayed() )
				continue;

			this.displayField( field );
		}
	}


	public tryToEndGame()
	{
		let state;

		if ( this.board.find( ( v ) => v.isDisplayed ) == undefined )
			state = true;
		else if ( this.board.find( ( v ) => v.isMine && v.isDisplayed() ) )
			state = false;
		else
		{
			const notDisplayedFields = this.board.filter( ( v ) => v.state != FieldState.DISPLAYED );

			if ( notDisplayedFields.length == this.minesCount )
			{
				state = true;

				for ( let field of notDisplayedFields )
					field.state = FieldState.MARKED;
			}
		}

		if ( state !== undefined )
			this.endGame( state );
	}


	public endGame( success: boolean )
	{
		this.displayNotTouchedFields();

		if ( success )
			alert( "You won!" );
		else
			alert( "You lose!" );
	}


	protected displayNotTouchedFields()
	{
		for ( let field of this.board )
			if ( field.state == FieldState.DEFAULT )
				field.state = FieldState.DISPLAYED;
	}


	public switchFieldState( field: Field )
	{
		if ( field.isDisplayed() )
			return;

		if ( field.state == FieldState.DEFAULT )
			field.state = FieldState.MARKED;
		else if ( field.state == FieldState.MARKED )
			field.state = FieldState.UNKNOWN;
		else
			field.state = FieldState.DEFAULT;


	}
}
