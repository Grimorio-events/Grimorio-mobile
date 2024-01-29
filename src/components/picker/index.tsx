import { Picker } from "@react-native-picker/picker";
import { countries, getCountryData, TCountryCode } from "countries-list";
import { globalStyles } from "../../styles/styles";
import { TextInput, View } from "react-native";

type SignupDetails = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  country: string;
  city: string;
};

type PicerSelectProps = {
  singup: SignupDetails;
  setSingup: React.Dispatch<React.SetStateAction<SignupDetails>>;
};

const PicerSelect: React.FC<PicerSelectProps> = ({ singup, setSingup }) => {
  const getCountry = (code: TCountryCode) => {
    const data = getCountryData(code);
    return data.native;
  };

  const handleChange = (itemValue: string) => {
    setSingup((preventSingup: any) => ({
      ...preventSingup,
      country: itemValue,
    }));
  };

  return (
    <View style={globalStyles.textInput}>
      <Picker
        selectedValue={singup.country}
        onValueChange={(itemValue, itemIndex) => handleChange(itemValue)}
      >
        {Object.keys(countries).map((code: string, index: number) => (
          <Picker.Item
            style={{ color: "#333333" }}
            key={index}
            label={getCountry(code as TCountryCode)}
            value={getCountry(code as TCountryCode)}
          />
        ))}
      </Picker>
    </View>
  );
};

export default PicerSelect;
