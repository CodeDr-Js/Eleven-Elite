import React from "react";
import "./index.css";

const Sport = () => {
  return (
    <div className="d-flex pe-5">
      <div className="w-100">
        <div className="sport-div rounded-3 w-100">
          {/* <p className="fs-4 fw-bold">Sport</p>
            <div>
              <div>
                <h5>Live</h5>
                <p>173</p>
              </div>

              <div>
                <h5>Next</h5>
                <p>134</p>
              </div>
            </div> */}
        </div>

        <div className="sport-div rounded-3 w-100"></div>
      </div>

      <div className="w-100">
        <div className="sport-div rounded-3 w-100"></div>
        <div className="sport-div rounded-3 w-100"></div>
      </div>

      <div id="wg-api-football-fixtures"
                    data-host="v3.football.api-sports.io"
                    data-refresh="60"
                    data-date="2022-02-11"
                    data-key="04eb78ae9fmshdea258915f85221p13d313jsn8ed353a29efe"
                    data-theme="false"
                    data-show-errors="false"
                    className="api_football_loader">
        </div>
    </div>
  );
};

export default Sport;
