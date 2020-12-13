---
[title]:mongoose多表关联查询
[time]:2019-04-14
[tags]: JavaScript;MongoDB;Node.js
---

在mongoose中实现多表关联查询需要用到[db.collection.aggregate()](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/#aggregation-pipeline-stages)

先来看个多表关联查询的例子：

```javascript
await db.courses.aggregate([
  {
    $match: { id: 'xxx' }
  },
  {
    $lookup: {
      from: "teachers",
      localField: "teacherID",
      foreignField: "id",
      as: "tch"
    }
  },
  {
    $project: {
      _id: 0,
      __v: 0,
      tch: { 
        _id: 0,
        __v: 0,
      }
    }
  }
])
    .then(docs => {})
    .catch(err => {});
```

假设有courses集合，存放课程的相关数据，其中id字段为该课程的唯一标识，每一课程有一个授课老师，在集合中用teacherID字段存放该教师的工号；有teachers集合，存放所有老师的相关数据，其中id字段为该教师的工号，是教师唯一标识。

回到上面的代码，首先先看$match，这里应为一个对象，用于匹配courses集合中的字段，在这里是匹配id为”xxx”的数据。

接下来是$lookup，其中from属性的值为你要关联的集合名，我们要获取教师的信息，所以是teachers集合；localField属性的值为现在所处的集合（courses）中的需要作为关联条件的字段，我们需要teacherID来匹配teachers集合中的数据，所以填teacherID；foreignField属性的值为form属性的这一个集合（courses）中的需要与localField属性的这一个字段相匹配的字段（即是说localField的值是subject集合中的字段名，而foreignField的值是teachers集合中的字段名，并且localField和foreignField这两个字段名的值要相同）；as属性的值是查询结果中存储查询到的关联数据的属性名，是由你来自定义的，在上面的例子中假如根据teacherID查询到teachers集合中的某一条数据，那么这条数据将会存在于查询结果docs的tch属性中（因为$lookupas中as属性的值就为tch）。

最后是$project，这个对象用于设置哪些字段不存在于查询结果中（1为获取，0为不获取）。

> 查询结果docs是一个数组，元素是查询到的数据。

aggregate方法并不只有$match、$lookup、$project可配置，还有更多stage请看[文档](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/#aggregation-pipeline-stages)

上面的例子只是利用一个集合中的第一层子字段来关联另一个表来进行查询操作，那如果一个集合中有个字段值是数组，需要利用这个数组中元素的某一属性来进行关联另一个表呢？

```javascript
await db.courses.aggregate([
  {
    $match: { id: 'xxx' }
  },
  {
    $lookup: {
      from: "students",
      localField: "stus.id",
      foreignField: "id",
      as: "stus"
    }
  }
])
    .then(docs => {})
    .catch(err => {});
```

与上一个例子类似，还是courses集合，不过这次我们已知courses集合的数据中还有一个字段stus，它是一个用来存储学习该课程的学生信息对象，其中一个属性是id（学生的学号，作为学生的唯一标识），现在需要依靠这些学生的id关联students集合来获取更多关于这些学生的信息，students集合中的每一条数据中都有字段id存放学生的学号。

$lookup中，from属性是要关联的集合名，所以填students；localField应填courses集合中存放学生的学号的属性名作为与关联集合的匹配条件，即stus中的每个元素的属性：id，但在这里可以用stus.id表示；foreignField填students集合中需要作为与courses集合关联的匹配字段，所以为id，as填stus，将关联查询到的结果存到属性stus中。

最后的查询结果数组docs中的元素的stus属性也为一个数组，其中的元素就是关联查询到的students集合中的数据。