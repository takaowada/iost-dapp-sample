class Memo {
  init() {
    storage.put("memo", "");
  }

  /**
   * コントラクトが更新可能か？
   * @param {string} data 
   * @returns 可能ならtrue、そうでなければfalse
   */
  can_update(data) {
    return blockchain.requireAuth(blockchain.contractOwner(), "active");
  }

  /**
   * メモを保存する。
   * @param {string} key キー 
   * @param {string} value 値 
   */
  putMemo(key, value) {
    storage.mapPut(tx.publisher, key, value);
  }

  /**
   * メモを取得する。
   * @param {string} key キー
   * @returns メモの値
   */
  getMemo(key) {
    return storage.mapGet(tx.publisher, key);
  }
}
module.exports = Memo;
