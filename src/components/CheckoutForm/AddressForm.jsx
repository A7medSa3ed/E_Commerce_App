import React, { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput, FormSelect } from "./reusableComp";
import { getDataInArray } from "../../utils/helpers";

const AddressForm = ({ checkoutToken, goToPayment }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const formMethods = useForm();

  // Get All Available Countries
  const fetchShippingCountries = async checkoutTokenId => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]); // Get the First Country Code
  };

  // Get ALl Available Selected Country Subdivisions
  const fetchShippingSubdivisions = async countryCode => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  // Get ALl Available Selected Country Shipping Options
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const shippingOpt = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      {
        country,
        region,
      }
    );
    setShippingOptions(shippingOpt);
    setShippingOption(shippingOpt[0].id);
  };

  // Get Countries Data As An Array
  const countries = getDataInArray(shippingCountries);

  // Get Selected Country Subdivisions Data As An Array
  const subdivisions = getDataInArray(shippingSubdivisions);

  // Get Selected Country Subdivisions Data As An Array
  const options = shippingOptions.map(sO => ({
    id: sO.id,
    label: `${sO.description} - ${sO.price.formatted_with_symbol}`,
  }));

  // Get ALl Shipping Countries On Get checkoutToken ID
  useEffect(() => {
    let isMounted = false;
    !isMounted && fetchShippingCountries(checkoutToken.id);
    return () => (isMounted = true);
  }, [checkoutToken.id]);

  // Get ALl Shipping Country Subdivisions On Get shippingCountry
  useEffect(() => {
    let isMounted = false;
    !isMounted && shippingCountry && fetchShippingSubdivisions(shippingCountry);
    return () => (isMounted = true);
  }, [shippingCountry]);

  // Get ALl Shipping Country Subdivisions On Get shippingCountry
  useEffect(() => {
    let isMounted = false;
    !isMounted &&
      shippingSubdivision &&
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
    return () => (isMounted = true);
  }, [checkoutToken.id, shippingCountry, shippingSubdivision]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(data =>
            goToPayment({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First Name" />
            <FormInput name="lastName" label="Last Name" />
            <FormInput name="address1" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="ZIP / Postal Code" />

            <FormSelect
              inputLabel="Shipping Country"
              value={shippingCountry}
              list={countries}
              setFunc={setShippingCountry}
            />

            <FormSelect
              inputLabel="Shipping Subdivision"
              value={shippingSubdivision}
              list={subdivisions}
              setFunc={setShippingSubdivision}
            />

            <FormSelect
              inputLabel="Shipping Options"
              value={shippingOption}
              list={options}
              setFunc={setShippingOption}
            />
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back To Cart
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                !shippingCountry || !shippingSubdivision || !shippingOption
              }
            >
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </React.Fragment>
  );
};

export default AddressForm;
