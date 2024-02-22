const query = {
  findAll: "SELECT * FROM tb_user",
  create:
    "INSERT INTO tb_user (name, email, image, password) VALUES(@name, @email, @image, Convert(varbinary(100),@password))",
};

export default query;
