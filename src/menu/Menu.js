// @flow
import * as utils from '../utils';
import DownloadWindow from './DownloadWindow';
import TextSizeWindow from './TextSizeWindow';
import ImageSizeWindow from './ImageSizeWindow';
import ColorWindow from './ColorWindow';
import MenuWindow from './MenuWindow';

type OnDownloadRequested = () => void;
type OnTextSizeChanged = (number) => void;
type OnTextColorChanged = (string) => void;
type OnBackgroundColorChanged = (string) => void;
type OnImageSizeChanged = (width: number, height: number) => void;
type MenuCallbacks = {
	onDownloadRequested: OnDownloadRequested,
	onTextSizeChanged: OnTextSizeChanged,
	onTextColorChanged: OnTextColorChanged,
	onBackgroundColorChanged: OnBackgroundColorChanged,
	onImageSizeChanged: OnImageSizeChanged
};
type Options = {
	textSize: number,
	width: number,
	height: number,
	scale: number,
	backgroundColor: string,
	textColor: string
};
type ButtonElements = {
	textColor: HTMLElement,
	backgroundColor: HTMLElement,
	textSize: HTMLElement,
	imageSize: HTMLElement,
	download: HTMLElement
}
type MenuWindows = {
	download: DownloadWindow,
	textSize: TextSizeWindow,
	imageSize: ImageSizeWindow,
	textColor: ColorWindow,
	backgroundColor: ColorWindow
}

export default class Menu {
	_element: HTMLElement;
	_containerElement: HTMLElement;
	_windowElement: HTMLElement;
	_textColorButtonColorRectangleElement: HTMLElement;
	_backgroundColorButtonColorRectangleElement: HTMLElement;
	_menuWindows: MenuWindows;
	_callbacks: MenuCallbacks

	textSize: number;
	width: number;
	height: number;
	scale: number;
	backgroundColor: string;
	textColor: string;
	buttonElements: ButtonElements;
	scale: number;
	textColor: string;

	constructor(callbacks: MenuCallbacks) {
		this._callbacks = callbacks;
	}

	onStart(options: Options) {
		this.width = options.width;
		this.height = options.height;
		this.scale = options.scale;
		this.textSize = options.textSize;
		this.textColor = options.textColor;
		this.backgroundColor = options.backgroundColor;

		this._containerElement = utils.getElement('menu-container');
		this._element = utils.getElement('menu');
		this._windowElement = utils.getElement('menu-window');
		this._textColorButtonColorRectangleElement = utils.getElement('menu-button-text-color-rectangle-color');
		this._backgroundColorButtonColorRectangleElement = utils.getElement('menu-button-background-color-rectangle-color');
		
		const textSizeWindow = new TextSizeWindow('menu-editor-text-size', this._handleOnTextSizeChangeRequested);
		textSizeWindow.textSize = this.textSize;

		const textColorWindow = new ColorWindow(
			'menu-editor-text-color',
			'text-color-window-color-buttons-container',
			this._handleOnTextColorChangeRequested
		);
		textColorWindow.color = this.textColor;
		this._textColorButtonColorRectangleElement.style.backgroundColor = this.textColor;

		const backgroundColorWindow = new ColorWindow(
			'menu-editor-background-color',
			'background-color-window-color-buttons-container',
			this._handleOnBackgroundColorChangeRequested
		);
		backgroundColorWindow.color = this.backgroundColor;
		this._backgroundColorButtonColorRectangleElement.style.backgroundColor = this.backgroundColor;

		const imageSizeWindow = new ImageSizeWindow('menu-editor-image-size', this._handleOnImageSizeChangeRequested, () => {
			imageSizeWindow.width = this.width;
			imageSizeWindow.height = this.height;
			imageSizeWindow.scale = this.scale;
		});

		this._menuWindows = {
			download: new DownloadWindow('menu-editor-download', this._callbacks.onDownloadRequested),
			textSize: textSizeWindow,
			imageSize: imageSizeWindow,
			textColor: textColorWindow,
			backgroundColor: backgroundColorWindow
		};

		this.buttonElements = {
			textColor: utils.getElement('menu-button-text-color'),
			backgroundColor: utils.getElement('menu-button-background-color'),
			textSize: utils.getElement('menu-button-text-size'),
			imageSize: utils.getElement('menu-button-image-size'),
			download: utils.getElement('menu-button-download')
		};

		const setClickHandler = (buttonElement, menuWindow: MenuWindow) =>
			buttonElement.addEventListener('click', () => this.onToggleMenuWindow(buttonElement, menuWindow));

		setClickHandler(this.buttonElements.textColor, this._menuWindows.textColor);
		setClickHandler(this.buttonElements.backgroundColor, this._menuWindows.backgroundColor);
		setClickHandler(this.buttonElements.textSize, this._menuWindows.textSize);
		setClickHandler(this.buttonElements.imageSize, this._menuWindows.imageSize);
		setClickHandler(this.buttonElements.download, this._menuWindows.download);
	}

	onShow = () => {
		this._containerElement.style.display = 'flex';
	}

	onHide = () => {
		this._containerElement.style.display = 'none';
	}

	closeAllWindows = () => {
		utils.kvoIndexed(this.buttonElements).forEach(({ value }: { value: HTMLElement }) =>
			value.classList.remove('active-button')
		);
	
		utils.objForEach(this._menuWindows, (menuWindow: MenuWindow) => menuWindow.close());
	}

	_handleOnTextSizeChangeRequested = (newTextSize: number) => {
		this.textSize = newTextSize;
		this._menuWindows.textSize.textSize = this.textSize;
		this._callbacks.onTextSizeChanged(this.textSize);
	}

	_handleOnTextColorChangeRequested = (newTextColor: string) => {
		this.textColor = newTextColor;
		this._menuWindows.textColor.color = this.textColor;
		this._textColorButtonColorRectangleElement.style.backgroundColor = this.textColor;
		this._callbacks.onTextColorChanged(this.textColor);
		this.onToggleMenuWindow(
			this.buttonElements.textColor,
			this._menuWindows.textColor,
			false
		);
	}

	_handleOnImageSizeChangeRequested = (width: number, height: number, scale: number) => {
		this.width = width || 0;
		this.height = height || 0;
		this.scale = scale || 0;
	}

	_handleOnBackgroundColorChangeRequested = (newBackgrundColor: string) => {
		this.backgroundColor = newBackgrundColor;
		this._menuWindows.backgroundColor.color = this.backgroundColor;
		this._backgroundColorButtonColorRectangleElement.style.backgroundColor = this.backgroundColor;
		this._callbacks.onBackgroundColorChanged(this.backgroundColor);
		this.onToggleMenuWindow(
			this.buttonElements.backgroundColor,
			this._menuWindows.backgroundColor,
			false
		);
	}

	onToggleMenuWindow = (buttonElement: Object, menuWindow: MenuWindow, shouldMenuOpen: ?boolean = null) => {
		if (shouldMenuOpen == null) {
			const isMenuOpen: boolean = this._element.classList.contains('menu-active');
			const buttonWasActive = buttonElement.classList.contains('active-button');
			shouldMenuOpen = !isMenuOpen;
			if (!buttonWasActive) {
				shouldMenuOpen = true;
			}
		}

		this.closeAllWindows();

		if (shouldMenuOpen) {
			this._element.classList.remove('menu');
			this._element.classList.add('menu-active');
			this._windowElement.style.display = 'flex';

			buttonElement.classList.add('active-button');
			menuWindow.open();
		}
		else {
			this._element.classList.remove('menu-active');
			this._element.classList.add('menu');
			this._windowElement.style.display = 'none';
		}
	}
}
