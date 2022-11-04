import axios from "axios";

class ApiProvider {
  #token = undefined;
  #instance = undefined;
  constructor() {
    this.#instance = axios.create({
      baseURL: process.env.API_BASE_URL,
      timeout: 15000,
    });
  }
  #setAuthToken = (authToken) => {
    this.#token = authToken;
    this.#instance.defaults.headers.common["Authorization"] = this.#token;
  };
  clearAuthToken = () => {
    this.#token = undefined;
    this.#instance.defaults.headers.common["Authorization"] = undefined;
  };
  logout = () => this.clearAuthToken();
  // getAuthToken = () => this.#token;
  signin = async (username, password) => {
    if ([username, password].includes(undefined)) return;

    try {
      //   console.log(`${process.env.API_BASE_URL}/api/login`);
      const res = await this.#instance.post("/login", {
        username,
        password,
      });
      // console.log(res);
      if (res.status === 200) {
        this.#setAuthToken(res.data.access_token);
        return { auth: true, status: res.status, token: this.#token };
      }
      return { auth: false, status: res.status };
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404)
          throw {
            auth: false,
            status: error.response.status,
            msg: "User does not exist",
          };
        if (error.response.status === 400)
          throw {
            auth: false,
            status: error.response.status,
            msg: "Sorry for inconvenience, Please try again later",
          };
        throw {
          auth: false,
          status: error.response.status,
          msg: "Sorry for inconvenience, Please try again later",
        };
      }
      throw {
        auth: false,
        msg: "Sorry for inconvenience, Please try again later",
      };
    }
  };

  register = async (data) => {
    try {
      const res = this.#instance.post("/register", { ...data });
      return res;
    } catch (error) {
      return { status: 500 };
    }
  };
  forgotPassword = async (email) => {
    try {
      const res = this.#instance.post("/forgotpassword", { email });
      return res;
    } catch (error) {
      return { status: 500 };
    }
  };
  resetPassword = async (password, uniqueid) => {
    try {
      const res = this.#instance.post("/resetpassword", { password, uniqueid });
      return res;
    } catch (error) {
      return { status: 500 };
    }
  };
}

const apiProvider = new ApiProvider();
Object.freeze(apiProvider);

module.exports = apiProvider;
