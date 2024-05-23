import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import CustomButton from "./atoms/CustomButton";
import CustomCheckbox from "./atoms/CustomCheckbox";
const PasswordBox = () => {
  const [password, setPassword] = useState("");
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeAlphabets, setIncludeAlphabets] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [length, setLength] = useState(12);
  const [previousPasswords, setPreviousPasswords] = useState([]);

  useEffect(() => {
    const storedPasswords =
      JSON.parse(localStorage.getItem("previousPasswords")) || [];
    setPreviousPasswords(storedPasswords);
  }, []);
  const [text] = useTypewriter({
    words: ["Password", "Pssarowd", "Psaswrod"],
    loop: {},
  });
  const generatePassword = () => {
    const options = { includeNumbers, includeAlphabets, includeSpecialChars };
    const newPassword = createPassword(length, options);
    setPassword(newPassword);
    setPreviousPasswords([newPassword, ...previousPasswords.slice(0, 4)]);
    localStorage.setItem(
      "previousPasswords",
      JSON.stringify(previousPasswords)
    );
  };
  const createPassword = (length, options) => {
    const numbers = "0123456789";
    const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialCharacters = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let pass = "";
    let string = "";

    if (options.includeNumbers) string += numbers;
    if (options.includeAlphabets) string += alphabets;
    if (options.includeSpecialChars) string += specialCharacters;
    if (
      !options.includeNumbers &&
      !options.includeAlphabets &&
      !options.includeSpecialChars
    )
      string += numbers + alphabets + specialCharacters;

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(char);
    }
    return pass;
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="container">
      <h3>
        Random <span>{text}</span>
        &nbsp;Generator
      </h3>
      <TextField
        type="number"
        label="Password Length"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />
      <input
        type="text"
        readOnly
        disabled
        name="password"
        placeholder="Password"
        id=""
        value={password}
      />
      <Grid
        container
        rowSpacing={{ xs: 1, sm: 2 }}
        columnSpacing={{ xs: 2, sm: 1, md: 1 }}
      >
        <Grid item xs={6}>
          <CustomButton
            onClick={generatePassword}
            color="success"
            children={"GeneratePassword"}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <CustomButton
            onClick={copyToClipboard}
            color="primary"
            children={"Copy to clipboard"}
            size="small"
          />
        </Grid>
      </Grid>

      <CustomCheckbox
        checked={includeNumbers}
        onChange={(e) => setIncludeNumbers(e.target.checked)}
        label="Include Numbers"
      />
      <CustomCheckbox
        checked={includeAlphabets}
        onChange={(e) => setIncludeAlphabets(e.target.checked)}
        label="Include Alphabets"
      />
      <CustomCheckbox
        checked={includeSpecialChars}
        onChange={(e) => setIncludeSpecialChars(e.target.checked)}
        label="Include Special Characters"
      />
      <div className="prevpass">
        <h4>Last 5 Passwords</h4>
        <ol>
          {previousPasswords.map((pwd, index) => (
            <li key={pwd}>{pwd}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default PasswordBox;
