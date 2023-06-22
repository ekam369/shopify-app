import React, { useEffect, useState } from "react";
import {
	render,
	Banner,
	DatePicker,
	useMetafield,
	useApplyMetafieldsChange,
	Text,
     
} from "@shopify/checkout-ui-extensions-react";
import { Helper } from "./const/utils";

render("Checkout::ShippingMethods::RenderAfter", () => <App />);

function App() {
	const [isHidden, setHidden] = useState(false);
	const [error, setError] = useState(null);
	const deliveryDate = useMetafield({
		namespace: "details",
		key: "date",
	});

	const setDeliveryDate = useApplyMetafieldsChange();

	const handleDateChange = (selectedDate) => {
		const today = new Date().toISOString().split("T")[0];
		if (selectedDate < today) {
			setError("You cannot select a date before today.");
		} else {
			setError(null);
			setDeliveryDate({
				type: "updateMetafield",
				namespace: "details",
				key: "date",
				valueType: "string",
				value: selectedDate,
			});
		}
	};

	useEffect(() => {
		const checkRenderExtension = async () => {
			try {
				const response = await Helper("delivery");
				if (response?.delivery) {
					const data = response?.delivery[0];
					setHidden(data?.isDelivery);
					console.log(isHidden, "hj");
				}else{
               setHidden(false)
        }
			} catch (error) {
				console.log(error);
				setHidden(false);
			}
		};

		checkRenderExtension();
		// setHidden(true)  
	}, []);

	console.log(isHidden, "ishidde");
	return (
		<>
			{isHidden === true ? (
				<Banner
					title="Choose Your Delivery Day"
					status={error != null ? "critical" : "info"}>
					<DatePicker
						selected={deliveryDate?.value}
						onChange={handleDateChange}
					/>
					{error != null && (
						<Text appearance="critical">{error}</Text>
					)}
				</Banner>
			) : (
				<></>
			)}
		</>
	);
}
