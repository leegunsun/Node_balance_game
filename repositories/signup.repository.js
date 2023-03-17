// 모듈 불러오기
const { pool } = require('../db');

// 닉네임 중복 검사 함수
async function isExistingNickname(nickname) {
  const query = {
    text: 'SELECT id FROM users WHERE nickname = $1',
    values: [nickname],
  };
  const { rows } = await pool.query(query);
  return rows.length > 0;
}

// 회원가입 함수
async function signup(nickname, password) {
  const query = {
    text: 'INSERT INTO users (nickname, password) VALUES ($1, $2)',
    values: [nickname, password],
  };
  await pool.query(query);
}

// 모듈 내보내기
module.exports = {
  isExistingNickname,
  signup,
};
