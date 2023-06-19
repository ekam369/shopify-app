import React, { useState } from "react";
import {
	useExtensionApi,
	render,
	Banner,
	useTranslate,
	DatePicker,
	useMetafield,
	useApplyMetafieldsChange,
} from "@shopify/checkout-ui-extensions-react";

// render("Checkout::Dynamic::Render", () => <App />);
render("Checkout::ShippingMethods::RenderAfter", () => <App />);

function App() {
	const { extensionPoint } = useExtensionApi();
	const translate = useTranslate();
	const deliveryDate = useMetafield({
		namespace: "details",
		key: "date",
	});

	const setDeliveryDate = useApplyMetafieldsChange();
	return (
		<Banner title="Choose Your Delivery Day">
			{/* {translate('welcome', {extensionPoint})} */}
			<DatePicker
				selected={deliveryDate?.value}
				onChange={(value) => {
					setDeliveryDate({
						type: "updateMetafield",
						namespace: "details",
						key: "date",
						valueType: "string",
						value,
					});
				}}
			/>
		</Banner>
	);
}
