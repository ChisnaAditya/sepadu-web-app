function Card(props) {
  return (
    <div className="card shadow-xl bg-white font-poppins">
      <figure>
        <img className="object-contain h-20 w-40 lg:h-40 lg:w-full" src={props.cardImg} alt="cardImage" />
      </figure>
      <div className="p-2">
        <p className="card-title text-sm text-my-dark-blue">{props.cardTitle}</p>
        <p className="card-title text-sm text-my-dark-blue">{props.cardAuthor}</p>
        <p className="card-title text-sm text-my-dark-blue">{props.cardDesc}</p>
        <p className="card-title text-sm text-my-dark-blue lg:text-xl lg:text-center lg:px-10 lg:pb-5">{props.cardCaption}</p>
      </div>
    </div>
  );
}

export default Card;
