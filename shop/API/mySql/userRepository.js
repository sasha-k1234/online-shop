module.exports = class UserRepository {
  constructor(dbContext, prouductRepository) {
    this.sqlManager = dbContext;
    this.prouductRepository = prouductRepository;
  }

  async addUser(username, email, password, first_name, last_name, birth_date) {
    let dateSplit = birth_date.split("-");

    const dateString = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]} 12:0:0`;
    const query = `insert into user(
          username,
          email,
          password,
          first_name,
          last_name,
          birth_date
          ) 
        values('${username}','${email}','${password}','${first_name}','${last_name}','${dateString}')`;
    const userRes = await this.sqlManager.queryToPromis(query);
    const addRole = `INSERT INTO user_role(
    user_id,
    role_id
    ) values(${userRes.result.insertId},${1})`;
    const roleRes = await this.sqlManager.queryToPromis(addRole);

    // return {
    //   id: userRes.result.insertId,
    //   username,
    //   email,
    //   password,
    //   first_name,
    //   last_name,
    //   birth_date,
    // };
  }

  async getUser(email) {
    const query = `SELECT * FROM user WHERE email ='${email}' LIMIT 1`;
    const res = await this.sqlManager.queryToPromis(query);

    if (res.result.length === 0) {
      return null;
    }
    
    const rolesQuery = `SELECT LOWER(normalized_name) AS name FROM user_role JOIN role ON role.id = user_role.role_id WHERE user_role.user_id = ${res.result[0].id}`;
    const rolesRes = await this.sqlManager.queryToPromis(rolesQuery);

    return { ...res.result[0], roles: rolesRes.result.map((x) => x.name) };
  }

  async getUserData(username) {
    const query = `SELECT user.id,user.username,user.email,user.first_name,user.last_name,user.birth_date
                     FROM user 
                    WHERE user.username = '${username}'`;
    const userRes = await this.sqlManager.queryToPromis(query);

    const photoQuery = `SELECT id,url,is_main FROM photo
                        JOIN user_photo ON photo_id = photo.id
                        WHERE user_id = ${userRes.result[0].id}`;
    const favoritesQuery = `SELECT * FROM product
                            JOIN favorite ON product_id = id
                            WHERE user_id = ${userRes.result[0].id}`;

    const userPhotoRes = await this.sqlManager.queryToPromis(photoQuery);
    const favRes = await this.sqlManager.queryToPromis(favoritesQuery);
    const favProducts = favRes.result;

    for (let i = 0; i < favProducts.length; i++) {
      favProducts[i].photos = await this.prouductRepository.getPhotos(
        favProducts[i].id
      );
    }

    return {
      username: userRes.result[0].username,
      email: userRes.result[0].email,
      first_name: userRes.result[0].first_name,
      last_name: userRes.result[0].last_name,
      birth_date: userRes.result[0].birth_date,
      photos: userPhotoRes.result,
      favorites: favRes.result.map((el) => ({
        id: el.id,
        price: el.price,
        name: el.name,
        description: el.description,
        rating: el.rating,
        category_id: el.category_id,
        category: {
          name: el.category_name,
          id: el.category_id,
        },
        is_deleted: el.is_deleted,
        photos: el.photos,
      })),
    };
  }

  async editUser(id, first_name, last_name, email, username) {
    const query = `UPDATE user SET first_name = '${first_name}',
                   last_name = '${last_name}',
                   email = '${email}',
                   username = '${username}'
                   WHERE id = ${id}
                   `;
    const res = await this.sqlManager.queryToPromis(query);
    return await this.getUserData(id);
  }

  async changePassword(id, new_password) {
    const query = `UPDATE user SET user.password = '${new_password}'
                    WHERE id = ${id}`;
    const res = await this.sqlManager.queryToPromis(query);
  }

  async addProfilePhoto(userId, url) {
    const selectQuery = `SELECT count(*) AS count_ FROM photo 
                         JOIN user_photo ON photo_id = id 
                         WHERE user_id = ${userId}`;
    const res = await this.sqlManager.queryToPromis(selectQuery);
    const is_main = res.result[0].count_ > 0 ? false : true;
    const insQuery = `
    INSERT INTO photo(url,is_main) VALUES('${url}',${is_main})`;
    const insRes = await this.sqlManager.queryToPromis(insQuery);
    const photoId = insRes.result.insertId;
    const userPhotoQuery = `INSERT INTO user_photo(photo_id,user_id) VALUES(${photoId},${userId})`;
    const userPhotoRes = await this.sqlManager.queryToPromis(userPhotoQuery);
    return {
      id: photoId,
      url,
      is_main,
    };
  }

  async setAsMainPhoto(photoId, userId) {
    const setFalseQuery = `UPDATE photo SET is_main = false WHERE id IN(SELECT photo_id FROM user_photo WHERE user_id = ${userId})`;
    const setTrueQuery = `UPDATE photo SET is_main = true WHERE id = ${photoId}`;
    const falseRes = await this.sqlManager.queryToPromis(setFalseQuery);
    const trueRes = await this.sqlManager.queryToPromis(setTrueQuery);
  }

  async deleteFromGallery(photoId) {
    const userPhotoQuery = `DELETE FROM user_photo WHERE photo_id = ${photoId}`;
    const photoQuery = `DELETE FROM photo WHERE id = ${photoId}`;
    const userRes = await this.sqlManager.queryToPromis(userPhotoQuery);
    const photoRes = await this.sqlManager.queryToPromis(photoQuery);
  }
};
