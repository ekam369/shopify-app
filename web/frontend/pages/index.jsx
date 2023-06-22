import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
  Button,
  Checkbox,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { ProductsCard } from "../components";

export default function HomePage() {
  const [isDelivery, setDelivery] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetch = useAuthenticatedFetch();
  const handleChange = useCallback((newChecked) => setDelivery(newChecked), []);
  const handleSubmit = async () => {
		console.log("hey ", isDelivery);
		try {
       setLoading(true)
			const response = await fetch("api/delivery", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ isDelivery: isDelivery }),
			});
			const data =  await response.json();
      if(data){
       setLoading(false)
      }
			console.log(data, "addddddddddd");
		} catch (error) {
			console.log(error, "error");
		}
  };  
  return (
		<Page narrowWidth>
			{/* <TitleBar title={t("HomePage.title")} primaryAction={null} /> */}
			<Layout>
				<Layout.Section>
					<div
						style={{
							display: "flex",
							gap: "5px",
							alignItems: "center",
							margin: "10px 0px",
						}}>
						<Text>
							Please check this box if you would like to add a
							custom delivery date :
						</Text>
						<Checkbox
							checked={isDelivery}
							onChange={handleChange}
						/>
					</div>
					<Button fullWidth onClick={handleSubmit} loading={loading}>
						Submit
					</Button>
				</Layout.Section>
				<Layout.Section>
					{/* <ProductsCard /> */}
				</Layout.Section>
			</Layout>
		</Page>
  );
}
