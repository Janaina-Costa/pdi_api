const query = {
  findAll: "SELECT * FROM tb_user",

  findById: "SELECT * FROM tb_user WHERE id = @id",

  findOne: "SELECT * FROM tb_user WHERE email = @email",

  create:
    "INSERT INTO tb_user (name, email, image, password) VALUES(@name, @email, @image, Convert(varbinary(100),@password))",

  update:
    "UPDATE tb_user SET name = @name, email = @email, image = @image, password = Convert(varbinary(100),@password), updatedAt = @updatedAt WHERE id = @id",

  delete: "DELETE FROM tb_user WHERE id = @id",

  countUser: "SELECT COUNT(*) AS totalUser FROM tb_user",
};

export default query;
