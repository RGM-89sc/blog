---
[title]:JDBC连接MySQL时出现timezone的错误
[time]:2018-05-04
[tags]: Java;MySQL
---

代码：

```java
public static void main(String[] args) throws Exception{
    Class.forName("com.mysql.cj.jdbc.Driver");
    String url = "jdbc:mysql://127.0.0.1:3309/mydb";
    Connection con = DriverManager.getConnection(url, "root", "root");

    Statement cmd = con.createStatement();
    String sql = "select * from student";
    ResultSet rs = cmd.executeQuery(sql);

    while(rs.next()){
        int sno = rs.getInt(1);
        String sname = rs.getString(2);
        String sbirth = rs.getString(3);
        String saddress = rs.getString(4);
        System.out.println("sno: " + sno + "，sname: " + sname + "，sbirth: " + sbirth + "，saddress: " + saddress);
    }
    con.close();
}
```

报错情况：
*Exception in thread “main” java.sql.SQLException: The server time zone value ‘ÖÐ¹ú±ê×¼Ê±¼ä’ is unrecognized or represents more than one time zone. You must configure either the server or JDBC driver (via the serverTimezone configuration property) to use a more specifc time zone value if you want to utilize time zone support.*

解决方法：
在连接数据库的url末尾加上”?serverTimezone=UTC”，如：

```java
String url = "jdbc:mysql://127.0.0.1:3309/mydb?serverTimezone=UTC";
```

这样JDBC就能顺利连接到数据库了