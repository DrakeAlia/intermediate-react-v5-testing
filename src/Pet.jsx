import { Link } from "react-router-dom";

const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images && images.length) {
    hero = images[0];
  }

  // data-testid is a special attribute that is used by testing libraries
  // to find elements in the DOM
  // data-testid can be moved anywhere based on where you want to test it and if anything changes 
  // to your code down the line
  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img data-testid="thumbnail" src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
