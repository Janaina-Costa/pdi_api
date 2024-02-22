const query = {
  findAll: "SELECT * FROM tb_user",
  findById: "SELECT * FROM tb_user WHERE id = @id",
  create:
    "INSERT INTO tb_user (name, email, image, password) VALUES(@name, @email, @image, Convert(varbinary(100),@password))",
  delete: "DELETE FROM tb_user WHERE id = @id",
};

export default query;
