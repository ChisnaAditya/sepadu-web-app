import Card from "./Card";
import card_1 from "../assets/images/card_1.png";
import card_2 from "../assets/images/card_2.png";
import card_3 from "../assets/images/card_3.png";
import card_4 from "../assets/images/card_4.png";
import card_5 from "../assets/images/card_5.png";
import card_6 from "../assets/images/card_6.png";
import CardSide from "./CardSide";

function TentangKami(props) {
  return (
    <div className="font-poppins text-center pb-10 lg:mt-20">
      <h2
        ref={props.scrollToView}
        className="text-lg font-bold text-my-dark-blue mt-10 font-poppins text-center lg:mb-10 lg:text-4xl"
      >
        APA YANG BISA KAMU <br /> DAPATKAN DARI SEPADU?
      </h2>
      <div id="cards" className="lg:bg-my-dark-blue lg:rounded-t-[25rem]">
        <div
          id="atas"
          className="container grid grid-cols-1 gap-4 pt-4 lg:flex"
        >
          <CardSide
            cardImg={card_1}
            cardCaption="Kamu dapat mengetahui kesiapanmu sebelum menjalin pernikahan"
          />
          <CardSide
            cardImg={card_2}
            cardCaption="Kamu dapat mengakses edukasi mengenai langkah langkah menuju pelaminan"
          />
          <CardSide
            cardImg={card_3}
            cardCaption="Dapat memantapkan diri sebelum menuju jenjang pernikahan"
          />
        </div>

        <div className="lg:bg-my-dark-blue">
          <h2 className="text-lg font-bold text-my-dark-blue lg:text-white mt-20 mb-4 lg:text-3xl lg:mb-10 lg:mt-40">
            KENAPA HARUS <br /> MENGGUNAKAN SEPADU?
          </h2>
          <div
            id="bawah"
            className="container grid grid-cols-2 gap-4 lg:grid lg:grid-cols-3 lg:pb-10"
          >
            <Card
              cardImg={card_4}
              cardCaption="Konten terpercaya dari akademisi"
            />
            <Card
              cardImg={card_5}
              cardCaption="Privasi yang aman dan terjamin"
            />
            <Card
              cardImg={card_6}
              cardCaption="Materi yang diberikan interaktif"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TentangKami;
