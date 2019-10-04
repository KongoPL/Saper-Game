export class Field
{
	public x: number;
	public y: number;

	public value: number;

	public state: FieldState = FieldState.DEFAULT;
	public isMine: boolean = false;

	constructor( config: { x?: number, y?: number, state?: FieldState, value?: number, isMine?: boolean } )
	{
		for ( let key in config )
			this[key] = config[key];
	}
}


export enum FieldState
{
	DEFAULT = 'default',
	MARKED = 'marked',
	UNKNOWN = 'unknown',
	DISPLAYED = 'displayed'
}
