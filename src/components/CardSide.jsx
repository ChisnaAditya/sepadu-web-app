function CardSide(props) {
  return (
    <div className="card card-side grid grid-cols-3 gap-4 shadow-xl bg-my-dark-blue lg:bg-transparent lg:shadow-none lg:flex lg:flex-col lg:gap-0">
      <figure className="p-4 lg:p-0">
        <img
          className="object-scale-down h-20 w-40 lg:h-52 lg:w-52"
          src={props.cardImg}
          alt="cardImage"
        />
      </figure>
      <div className="card-body col-span-2 p-0 pt-4 pb-4 lg:p-0">
        <p className="card-title text-left text-xs text-white lg:text-xl lg:text-center lg:px-10 lg:pb-5">
          {props.cardCaption}
        </p>
      </div>
    </div>
  );
}

export default CardSide;
