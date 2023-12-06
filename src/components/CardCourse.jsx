function CardCourse(props) {
  return (
    <div
      id="card-course"
      className={`card ${
        props.isEligible ? "bg-white" : "bg-gray-500"
      } shadow-xl font-poppins cursor-pointer h-60 lg:h-80`}
    >
      <figure className="object-cover">
        <img src={props.hero} alt="hero-image" />
      </figure>
      <div className="p-2">
        <h2
          aria-busy={props.isEligible}
          accessKey={props.courseNumber}
          className="card-title hover:text-my-dark-blue text-lg lg:text-2xl"
          onClick={props.onClickCourse}
        >
          {props.title}
        </h2>
        <p className="text-xs lg:text-sm mb-4">by {props.author}</p>
        <p className="text-sm lg:text-lg leading-none">{props.desc}</p>
      </div>
    </div>
  );
}

export default CardCourse;
