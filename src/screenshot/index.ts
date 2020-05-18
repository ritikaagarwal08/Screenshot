import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as html2canvasWrong from "html2canvas"
var html2canvas = html2canvasWrong as any as (element: HTMLElement, options?: Partial<html2canvasWrong.Options>) => Promise<HTMLCanvasElement>

export class screenshot implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private button: HTMLButtonElement;
	private _notifyOutputChanged: () => void;
	private base64outputinp: string="";
	outputbase:string;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this.button = document.createElement("button");
		if(context.parameters.ButtonText.raw)
		{
			this.button.innerHTML = context.parameters.ButtonText.raw;
		}
		this.button.classList.add("SimpleIncrement_Button_Style");
		if(context.parameters.BackgroundColor.raw){
			this.button.style.backgroundColor = context.parameters.BackgroundColor.raw;
		}; 
		if(context.parameters.TextColor.raw)
		{
			this.button.style.color = context.parameters.TextColor.raw;
		};
		if(context.parameters.TextSize.raw)
		{
			this.button.style.fontSize = context.parameters.TextSize.raw;
		};
		if(context.parameters.Font.raw)
		{
			this.button.style.fontFamily = context.parameters.Font.raw;
		};
		this._notifyOutputChanged = notifyOutputChanged;
		//this.button.addEventListener("click", (event) => { this._value = this._value + 1; this._notifyOutputChanged();});
		this.button.addEventListener("click", this.onButtonClick.bind(this));
		// Adding the label and button created to the container DIV.
		this.button.style.width = container.style.width;
		if(context.parameters.ButtonHeight.raw)
		{
			this.button.style.height = context.parameters.ButtonHeight.raw + "px";
		};

		container.id = "containerid";
		container.appendChild(this.button);
		
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		if(context.parameters.ButtonText.raw)
		{
			this.button.innerHTML = context.parameters.ButtonText.raw;
		};
		if(context.parameters.BackgroundColor.raw){
			this.button.style.backgroundColor = context.parameters.BackgroundColor.raw;
		}; 
		if(context.parameters.TextColor.raw)
		{
			this.button.style.color = context.parameters.TextColor.raw;
		};
		if(context.parameters.TextSize.raw)
		{
			this.button.style.fontSize = context.parameters.TextSize.raw;
		};
		if(context.parameters.Font.raw)
		{
			this.button.style.fontFamily = context.parameters.Font.raw;
		};
		if(context.parameters.ButtonHeight.raw)
		{
			this.button.style.height = context.parameters.ButtonHeight.raw + "px";
		};
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			OutPut: this.base64outputinp
		};
	}
	public async onButtonClick(event: Event): Promise<void> {
		var abc = await html2canvas(document.body).then(function(canvas) {
			//console.log(canvas);
			//document.body.appendChild(canvas);
			var outputbase = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
			return outputbase; 
		});
		//console.log(abc);
		this.base64outputinp = abc;
		console.log(this.base64outputinp);
		this._notifyOutputChanged();
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}