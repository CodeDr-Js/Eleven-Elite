import React, { useContext, useEffect, useState } from "react";
import "../color/color.css";
import "./index.css";
import ArrowNav from "../arrowNav/ArrowNav";
import PromotionNav from "./PromotionNav/PromotionNav";
import PromotionCard from "./promotionCard";
import PromotionFC from "./PromotionFC";
import { API } from "../api-service/api-service";
import Cookies  from "js-cookie";
import { DataContext } from "../APIs/Api";
import { host, hostname, origin } from "../search_dir/search_dir";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/loader";
import Footer from "../Home/anti-scores/footer";

const hostName = `${origin}/register/?invited=`;

const Promotion = () => {
  const navigate = useNavigate();
  const { setActiveToken, setPromotion, promotion } = useContext(DataContext);
  const [activeButton1, setActiveButton1] = useState("level-1");
  const [message, setMessage] = useState();
  const token = Cookies.get("auth-token");
  const [loadings, setLoadings] = useState(false);
  const [activeButton, setActiveButton] = useState("promotion");

  if (!token) {
    navigate("/login");
  } else {
    setActiveToken(token);
  }
  //console.log(promotion);
  useEffect(() => {
    setLoadings(true);
    if (promotion !== null) {
      setLoadings(false);
    }
  }, [promotion]);

  useEffect(() => {
    if (promotion === null) {
      API.promotion(token)
        .then((result) => {
          // console.log(result, token["auth-token"]);
          if (result.success) {
            setPromotion(result);
          } else if (result.detail) {
            Cookies.remove("auth-token")
            setActiveToken("");
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
    } else {
      //console.log("Data is found in promotion..");
    }
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setMessage("Wallet address successfully copied to clipboard");
      })
      .catch((err) => {
        setMessage("Failed to copy text");
        console.error("Failed to copy text: ", err);
      });
  };

  setTimeout(() => {
    if (message) {
      setMessage("");
    }
  }, 3000);

  const handleInvite = () => {
    navigate("/invite");
  };

  const handlePending = () => {
    navigate("/pending");
  };

  return (
    <div className="mb-5">
      {" "}
      {activeButton === "promotion" ? (
        <div className="">
          <div className="fixed-top">
            <ArrowNav name="Promotion" />
          </div>
          {loadings ? <Loader /> : ""}
          <div className=" mt-5 pt-5 container">
            <div className="d-flex flex-column align-items-center invite-div ">
              <p>Invite Friends.</p>
              <p>Earn Money Together</p>
              {message ? (
                <p className="alert alert-success alert-text f-italic">
                  {message}
                </p>
              ) : (
                ""
              )}
              <div className="ref-link d-flex flex-column align-items-center">
                <div className="bg-transparent d-flex w-100">
                  {promotion !== null ? (
                    <p className="opacity-50 pe-4 ref-link-1">
                      {hostName + promotion.activities.referral.url}
                    </p>
                  ) : (
                    <p className="opacity-50 pe-4">{hostName}</p>
                  )}

                  <i
                    onClick={() =>
                      handleCopy(hostName + promotion.activities.referral.url)
                    }
                    id=""
                    className="fa fa-copy fa-fw fa-lg opacity-50 d-flex-1 bg-transparent ms-auto pt-1 "
                  ></i>
                </div>
              </div>
            </div>

            <div className="mt-4 commission-div rounded-4 p-3">
              <div className="bg-transparent d-flex">
                <p className="bg-transparent">Commission income</p>
                <button
                  className="btn btn-light rounded-5 commission-btn ms-auto pe-1"
                  onClick={handleInvite}
                >
                  {" "}
                  INVITE REWARDS{" "}
                  <i
                    id=""
                    className="fa fa-chevron-right bg-transparent fa-fw fa-lg icon-color "
                  ></i>
                </button>
              </div>

              <div className="bg-transparent amt-div mt-3 ">
                {promotion !== null ? (
                  promotion.activities.referral.earning_today.daily.amount ? (
                    <p className="bg-transparent text-warning">
                      {Number(promotion.activities.referral.earning_today.daily.amount).toFixed(2)}
                    </p>
                  ) : (
                    <p className="bg-transparent text-warning">0.0 USD</p>
                  )
                ) : (
                  ""
                )}

                <small className="bg-transparent">Today</small>
              </div>
              <div className="bg-transparent d-flex w-100 pb-4 av-border ">
                <div className="bg-transparent d-flex w-75  ">
                  <div className="bg-transparent amt-div mt-wg me-auto">
                    {promotion !== null ? (
                      promotion.activities.referral.commissions.earnings ? (
                        <p className="bg-transparent ">
                          {Number(promotion.activities.referral.commissions.earnings).toFixed(2)}{" "}
                          USD
                        </p>
                      ) : (
                        <p className="bg-transparent ">0.0 USD</p>
                      )
                    ) : (
                      ""
                    )}

                    <small className="bg-transparent">Available Bal.</small>
                  </div>
                  <div className="bg-transparent amt-div mt-wg">
                    {promotion !== null ? (
                      promotion.current_earning ? (
                        <p className="bg-transparent txt-color fw-bold ">
                          {Number(promotion.current_earning).toFixed(2)} USD
                        </p>
                      ) : (
                        <p className="bg-transparent txt-color fw-bold ">
                          0.0 USD
                        </p>
                      )
                    ) : (
                      ""
                    )}

                    <small className="bg-transparent">Total Cashed</small>
                  </div>
                </div>
              </div>

              <div className="bg-transparent mt-3 d-flex justify-content-around amt-div">
                <div className="bg-transparent pt-2">Invited Friends</div>
                <div className="bg-transparent d-flex flex-column align-items-center">
                  <p className="bg-transparent txt-color1">Total</p>
                  {promotion !== null ? (
                    promotion.active || promotion.inactive ? (
                      <small className="bg-transparent">
                        {promotion.active + promotion.inactive}
                      </small>
                    ) : (
                      <small className="bg-transparent">0</small>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div className="bg-transparent d-flex flex-column align-items-center">
                  <p className="bg-transparent txt-color1">Active</p>
                  {promotion !== null ? (
                    promotion.active ? (
                      <small className="bg-transparent">
                        {promotion.active}
                      </small>
                    ) : (
                      <small className="bg-transparent">0</small>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className="bg-transparent d-flex flex-column align-items-center"
                  onClick={handlePending}
                >
                  <p className="bg-transparent txt-color1">Pending</p>
                  {promotion !== null ? (
                    promotion.inactive ? (
                      <small className="bg-transparent">
                        {promotion.inactive}
                      </small>
                    ) : (
                      <small className="bg-transparent">0</small>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <PromotionNav
                activeButton={activeButton1}
                setActiveButton={setActiveButton1}
              />
            </div>

            {activeButton1 === "level-1" ? (
              <div className="mt-3">
                {promotion !== null ? (
                  promotion["a_level1"] ? (
                    promotion.activities.referral.generation_track ? (
                      promotion.activities.referral.generation_track[1] ? (
                        <PromotionCard
                          style="main-color"
                          deposited={
                            promotion.activities.referral.generation_track[1]
                              .gen_deposit
                              ? Number(promotion.activities.referral
                                  .generation_track[1].gen_deposit.amount).toFixed(2)
                              : "0.0"
                          }
                          registered={
                            promotion.activities.referral.generation_track[1]
                              .registered
                              ? promotion.activities.referral
                                  .generation_track[1].registered.count
                              : "0"
                          }
                          withdrawn={
                            promotion.activities.referral.generation_track[1]
                              .gen_withdraw
                              ? Number(promotion.activities.referral
                                  .generation_track[1].gen_withdraw.amount).toFixed(2)
                              : "0.0"
                          }
                          total={
                            promotion.activities.referral.generation_track[1]
                              .commission
                              ? Number(promotion.activities.referral
                                  .generation_track[1].commission.amount).toFixed(2)
                              : "0.0"
                          }
                        />
                      ) : (
                        <PromotionCard
                          style="main-color"
                          deposited={0}
                          registered={0}
                          withdrawn={0}
                          total={0}
                        />
                      )
                    ) : (
                      <PromotionCard
                        style="main-color"
                        deposited={0}
                        registered={0}
                        withdrawn={"0.00"}
                        total={"0.0"}
                      />
                    )
                  ) : (
                    <PromotionCard
                      style="main-color"
                      deposited={0}
                      registered={0}
                      withdrawn={"0.00"}
                      total={"0.0"}
                    />
                  )
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            {activeButton1 === "level-2" ? (
              <div className="mt-3">
                {promotion !== null ? (
                  promotion["a_level2"] ? (
                    promotion.activities.referral.generation_track ? (
                      promotion.activities.referral.generation_track[2] ? (
                        <PromotionCard
                          style="main-color-1"
                          deposited={
                            promotion.activities.referral.generation_track[2]
                              .gen_deposit
                              ? Number(promotion.activities.referral
                                  .generation_track[2].gen_deposit.amount).toFixed(2)
                              : "0.0"
                          }
                          registered={
                            promotion.activities.referral.generation_track[2]
                              .registered
                              ? promotion.activities.referral
                                  .generation_track[2].registered.count
                              : "0"
                          }
                          withdrawn={
                            promotion.activities.referral.generation_track[2]
                              .gen_withdraw
                              ? Number(promotion.activities.referral
                                  .generation_track[2].gen_withdraw.amount).toFixed(2)
                              : "0.0"
                          }
                          total={
                            promotion.activities.referral.generation_track[2]
                              .commission
                              ? promotion.activities.referral
                                  .generation_track[2].commission.amount.toFixed(2)
                              : "0.0"
                          }
                        />
                      ) : (
                        <PromotionCard
                          style="main-color-1"
                          deposited={0}
                          registered={0}
                          withdrawn={0}
                          total={0}
                        />
                      )
                    ) : (
                      <PromotionCard
                        style="main-color-1"
                        deposited={0}
                        registered={0}
                        withdrawn={0}
                        total={"0.0"}
                      />
                    )
                  ) : (
                    <PromotionCard
                      style="main-color-1"
                      deposited={0}
                      registered={0}
                      withdrawn={0}
                      total={"0.0"}
                    />
                  )
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            {activeButton1 === "level-3" ? (
              <div className="mt-3">
                {promotion !== null ? (
                  promotion["a_level3"] ? (
                    promotion.activities.referral.generation_track ? (
                      promotion.activities.referral.generation_track[3] ? (
                        <PromotionCard
                          style="main-color-2"
                          deposited={
                            promotion.activities.referral.generation_track[3]
                              .gen_deposit
                              ? Number(promotion.activities.referral
                                  .generation_track[3].gen_deposit.amount).toFixed(2)
                              : "0.0"
                          }
                          registered={
                            promotion.activities.referral.generation_track[3]
                              .registered
                              ? promotion.activities.referral
                                  .generation_track[3].registered.count
                              : "0"
                          }
                          withdrawn={
                            promotion.activities.referral.generation_track[3]
                              .gen_withdraw
                              ? Number(promotion.activities.referral
                                  .generation_track[3].gen_withdraw.amount).toFixed(2)
                              : "0.0"
                          }
                          total={
                            promotion.activities.referral.generation_track[3]
                              .commission
                              ? Number(promotion.activities.referral
                                  .generation_track[3].commission.amount).toFixed(2)
                              : "0.0"
                          }
                        />
                      ) : (
                        <PromotionCard
                          style="main-color-2"
                          deposited={0}
                          registered={0}
                          withdrawn={0}
                          total={0}
                        />
                      )
                    ) : (
                      <PromotionCard
                        style="main-color-2"
                        deposited={0}
                        registered={0}
                        withdrawn={0}
                        total={"0.0"}
                      />
                    )
                  ) : (
                    <PromotionCard
                      style="main-color-2"
                      deposited={0}
                      registered={0}
                      withdrawn={0}
                      total={"0.0"}
                    />
                  )
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            <div className="mt-3">
              <PromotionFC
                promotion={promotion !== null ? promotion : ""}
                activeButton={activeButton1}
              />
            </div>

            <div></div>
          </div>

          <Footer
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </div>
      ) : (
        navigate(`/${activeButton}`)
      )}
    </div>
  );
};

export default Promotion;
