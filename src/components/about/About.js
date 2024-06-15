import React from "react";
import "./about.css";
import f1 from "../../assets/about/f1.jpeg";
import f2 from "../../assets/about/f2.jpeg";
import f3 from "../../assets/about/f3.jpeg";
import f4 from "../../assets/about/f4.jpeg";
import f5 from "../../assets/about/f5.jpeg";
import ArrowNav from "../arrowNav/ArrowNav";

const About = () => {
  return (
    <>
      <div>
        <ArrowNav name="About" />
      </div>

      <article className="container">
        <p className="fw-bold">Eleven Elite Football (EFF)</p>

        <p>
          Eleven Elite Football is a very popular reverse betting website that
          pays you to predict the final score of a football match. Punters have
          more than 96% chance of winning on the website. Eleven Elite Football
          is a reverse betting website where you win a football match will not
          end when you predict the final score. For example, a punter may be
          asked to place a bet against the final score of a game between Arsenal
          and Spurs that ends at 0-0. If the game ends on a score other than
          0-0, the punter wins, giving the punter a more than 96% chance of
          winning.
        </p>

        <div>
          <div>
            <img src={f1} alt="fliers" style={{ width: "100%" }} />
          </div>
          <p className="pb-4">
            Welcome to Eleven Elite Football where you register and earn $3 as a
            registration Bonus. Punters will earn 5-7% daily provided that
            punters follow the company's game. When the company game loss,
            punters are refunded 100% of their stake.
          </p>
        </div>
        <div>
          <div>
            <img src={f2} alt="fliers" style={{ width: "100%" }} />
          </div>
          <p>Eleven Elite withdrawal criteria</p>
          <ol className="list">

          <li>🛅Satisfactory for withdrawal after 4 company's game </li>
          <li>🛅 minimum withdrawal $10 </li>
          <li>🛅3% withdrawal charges </li>
          <li>🛅 minimum deposit $10</li>
          </ol>
        </div>
        <div>
          <div>
            <img src={f3} alt="fliers" style={{ width: "100%" }} />
          </div>
          <p>
            {" "}
            Company's Games plan Elevin Elite provides two bets daily, and
            punters who bet as recommended won't lose their capital if the game
            loss. Their accounts receive a refund of their capital without
            profit 🇺🇸Personal Games If the punter loses the game they placed
            privately, they could lose their money without receiving a refund
          </p>
        </div>
        <div>
          <div>
            <img src={f4} alt="fliers" style={{ width: "100%" }} />
          </div>
          <p>
            <span className="fw-bold">REFERRAL COMMISSION</span>  <br></br>
            Eleven Elite rewards it's members with a
            referral commission. 🇺🇲Punters earn 12% on 1st generation referral
            deposit, when they place a bet. 🇺🇲Punters earn 6% on 2nd generation
            referral commission,when they place bet. 🇺🇲Punters earn 4% on 3rd
            generation referral commission,when they place a bet.
          </p>
        </div>
        <div>
          <div>
            <img src={f5} alt="fliers" style={{ width: "100%" }} />
          </div>
          <p>
            Bastian Additional reward for reaching milestones such as inviting
            10,20,50,100 and more people. 🇺🇲When a punter build upto 10 active
            user's the company's appreciate such punter with $15. 🇺🇲When a
            punter build upto 20 active user's the company's appreciate such
            punter with $30. 🇺🇲When a punter build upto 50 active user's the
            company's appreciate such punter with $75. 🇺🇲When a punter build
            upto 100 active user's the company's appreciate such punter with
            $150
          </p>
        </div>

        <p className="">
        EEFC is a fully regulated gambling service licensed by National Lottery Regulatory Commission (NLRC) issued  No 0014899
    <br/><br/>
      The EEFC team has united crypto-enthusiasts from all over the world. We are all bound up in the idea of developing crypto Gaming and do our best to serve you with a  smooth service.
      <br/><br/>
      We are interested in creating a profitable and enjoyable gaming platform for everyone. Therefore, we take the maximum capability to develop a blockchain secured gaming system to provide a number of advantages: scaling of the platform, paltry commission, min bets and instant transactions.
      <br/><br/>
      The EEFC group hopes to change the traditional sports and e-sports industry through blockchain technology, and constantly explore innovative game methods through the value application of digital currency round the globe
        </p>
      </article>
    </>
  );
};

export default About;
