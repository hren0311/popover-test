/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';


/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	URLPopover,
	URLInput,
	useBlockProps,
} from '@wordpress/block-editor';
import { Fragment, useState, useRef, createRef } from '@wordpress/element';
import {
	Button,
	PanelBody,
	PanelRow,
	TextControl,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
// import { keyboardReturn } from '@wordpress/icons';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

 const SocialLinkURLPopover = ( {
	url,
	setAttributes,
	setPopover,
	anchorRef,
} ) => (
	<URLPopover
		anchorRef={ anchorRef?.current }
		onClose={ () => setPopover( false ) }
	>
		<form
			className="block-editor-url-popover__link-editor"
			onSubmit={ ( event ) => {
				event.preventDefault();
				setPopover( false );
			} }
		>
			<div className="block-editor-url-input">
				<URLInput
					value={ url }
					onChange={ ( nextURL ) =>
						setAttributes( { url: nextURL } )
					}
					placeholder={ __( 'Enter address' ) }
					disableSuggestions={ true }
				/>
			</div>
			<Button
				label={ __( 'Apply' ) }
				type="submit"
			/>
		</form>
	</URLPopover>
);

export default function Edit( {setAttributes, isSelected} ) {
	const url = ""
	const [ showURLPopover, setPopover ] = useState( false );
	const [ref, setRef] = useState();
	const elRef = useRef([])

	const select = (c_r) => {
		setRef(c_r)
		setPopover( true )
	}
	
	const iconShow = () => {
		const data = [0, 1, 2, 3, 4];
		data.forEach((_, i) => {
			elRef.current[i] = createRef();
		});
		
		return (
			<>
				{data.map((_, i) => (
					<svg style={{marginRight:"5px"}}key={i} ref={elRef.current[i]} onClick={() => select(elRef.current[i])} x="0px" y="0px" width="32px" height="32px" viewBox="0 0 155 155" enableBackground="new 0 0 155 155">
						<polygon id="logomark-polyline" fillRule="evenodd" clipRule="evenodd" fill="#0CB9C7" points="128.25,26 147.19,96.69 95.44,148.44 24.75,129.5 5.81,58.81 57.56,7.06 "/>
			  		</svg>
				))}
			</>
		)
	}

	return (
		<div { ...useBlockProps() }>
			
			<div>
			{iconShow()}
			</div>
			{ isSelected && showURLPopover && (
				<SocialLinkURLPopover
					url={ url }
					setAttributes={ setAttributes }
					setPopover={ setPopover }
					position="bottom center"
					anchorRef={ ref }
				/>
			) }
		</div>
		
		
	);
}
