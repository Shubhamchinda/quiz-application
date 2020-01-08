import axios from "axios";

import { apiUrl } from "./settings";

export const API_URL = apiUrl;

let authAxios = axios.create({
  baseURL: apiUrl + "api"
});

class Request {
  addQuestion(data) {
    return new Promise((next, error) => {
      authAxios
        .post("/question", data)
        .then(d => {
          next(d.data);
        })
        .catch(err => {
          next({ error: true, err });
          error(err);
        });
    });
  }

  getQuestions(data) {
    return new Promise((next, error) => {
      authAxios
        .get("/question")
        .then(d => {
          next(d.data);
        })
        .catch(err => {
          next({ error: true, err });
          error(err);
        });
    });
  }

  addQuiz(data) {
    return new Promise((next, error) => {
      authAxios
        .post("/quiz", data)
        .then(d => {
          next(d.data);
        })
        .catch(err => {
          next({ error: true, err });
          error(err);
        });
    });
  }

  getAllQuiz(data) {
    return new Promise((next, error) => {
      authAxios
        .get("/quiz")
        .then(d => {
          next(d.data);
        })
        .catch(err => {
          next({ error: true, err });
          error(err);
        });
    });
  }

  getQuizById(data) {
    return new Promise((next, error) => {
      authAxios
        .get(`/quiz/${data}`)
        .then(d => {
          next(d.data);
        })
        .catch(err => {
          next({ error: true, err });
          error(err);
        });
    });
  }

  addResult(data) {
    return new Promise((next, error) => {
      authAxios
        .post(`/result`, data)
        .then(d => {
          next(d.data);
        })
        .catch(err => {
          next({ error: true, err });
          error(err);
        });
    });
  }
}
export default new Request();
