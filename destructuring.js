const companyInfor = {
  address: {
    address: "629 Debbie Drive",
    city: "Nashville",
    coordinates: {
      lat: 36.208114,
      lng: -86.58621199999999,
    },
    postalCode: "37076",
    state: "TN",
  },
  department: "Marketing",
  name: "Blanda-O'Keefe",
  title: "Help Desk Operator",
};

const { department, name, title, abc } = companyInfor;
const myHobbies = ["ngam mua", "di dao", "lam tho"];
const [hobby1, hobby2] = myHobbies;

function useState(initialState) {
  let state = initialState;

  function setState(newState) {
    state = newState;
  }
  return [state, setState];
}

const [product, setProduct] = useState(productInitialState);
