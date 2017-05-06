var http = require("http");
var url = require("url");

var express = require('express');
var app = express();
var cors = require('cors')
var root = "./";
var _ = require('lodash');

app.use(cors())
app.use(express.static(root));

var mysql = require('mysql');
var db_config = {
  host:'193.169.189.215',
  port: '3306',
  user:'halatikc_two',
  password:'rtyujh_7N%',
  database:'halatikc_angular'
};
var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
 //   console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

function start() {
  /*app.get("/api/hello", function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  });*/


  app.get('/api/navigation/category/:category', function (req, res) {
    connection.query('SET NAMES utf8');

    connection.query('SELECT id, name, description, translit, meta_title, meta_description, meta_keywords FROM categories WHERE view = 1 and type="categories" ORDER BY reyt', function(err, cat) {
      if (err) throw err;  
      var id;

      for (var i = 0; i < cat.length; i++) {
        if (cat[i].translit === req.params.category) { 
          id = cat[i].id;
        } else {
          _.unset(cat[i], 'description');
          _.unset(cat[i], 'id');
          _.unset(cat[i], 'meta_title');
          _.unset(cat[i], 'meta_description');
          _.unset(cat[i], 'meta_keywords');
        }
      }

      connection.query('SELECT translit, name FROM categories WHERE view = 1 and type="types" and p_id = ' + id + ' ORDER BY reyt', function(err, rows) {
        var index = _.findIndex(cat, function(o) { return o.id == id; });
        cat[index].children = rows;
        cat[index].active = true;
        res.json(cat);
      });
    });
  });



  app.get('/api/navigation/type/:type', function (req, res) {
    connection.query('SET NAMES utf8');
    connection.query('SELECT id, name, translit FROM categories WHERE view = 1 and type="categories" ORDER BY reyt', function(err, cat) {
      if (err) throw err;  

      var cat_id;
      connection.query('SELECT id, p_id, name, description, translit, meta_title, meta_description, meta_keywords FROM categories WHERE view = 1 and type="types" ORDER BY reyt', function(err, rows) {
        for (var i = 0; i < rows.length; i++) {
          if (rows[i].translit === req.params.type) {
            cat_id = rows[i].p_id;
          } else {
            _.unset(rows[i], 'description');
            _.unset(rows[i], 'id');
            _.unset(rows[i], 'meta_title');
            _.unset(rows[i], 'meta_description');
            _.unset(rows[i], 'meta_keywords');
          }
        }

        var sub = _.remove(rows, function(n) {
          return n.p_id == cat_id;
        });      

        for (var j = 0; j < cat.length; j++) {
          if (cat[j].id === cat_id) {
            cat[j].children = sub;
            cat[j].active = true;
          }
          _.unset(cat[j], 'id');
        }

        res.json(cat);
      });
    });
  });



  app.get('/api/navigation', function (req, res) {
    connection.query('SET NAMES utf8');

    connection.query('SELECT name, translit FROM categories WHERE view = 1 and type="categories" ORDER BY reyt', function(err, cat) {
      if (err) throw err;  
      res.json(cat);
    });
  });



  app.get('/api/items/main', function (req, res) {
    connection.query('SET NAMES utf8');
      var query = "SELECT items.id, items.name, items.price, brends.name as brand, brend as brand_id, categories.name as subcat_name, items.translit, items.color, items.description, items.material, items.articul, items.s, items.m, items.l, items.xl, items.xxl, items.xxxl, items.xxxxl, items.date " +
          "FROM items, brends, categories " +
          "WHERE show_on_home = 1 and items.brend = brends.id and items.view = 1 and items.subcat_id = categories.id";
      connection.query(query, function(err, rows) {
        if (err) throw err;
      //  response.writeHead(200, {"Access-Control-Allow-Origin": "*"});

        for (var j = 0; j < rows.length; j++) {
          rows[j].size = '';
          if (rows[j].s) { rows[j].size += 'S, '}
          if (rows[j].m) { rows[j].size += 'M, ' }
          if (rows[j].l) { rows[j].size += 'L, ' }
          if (rows[j].xl) { rows[j].size += 'XL, ' }
          if (rows[j].xxl) { rows[j].size += 'XXL, ' }
          if (rows[j].xxxl) { rows[j].size += 'XXXL, ' }
          if (rows[j].xxxxl) { rows[j].size += 'XXXXL, ' }

          rows[j].size = rows[j].size.slice(0, -2);
        }

        res.json(rows);
      });
  });



    app.get('/api/items/category/:cat_name', function (req, res) {
    connection.query('SET NAMES utf8');
    var perpage = 10,
        start_pos = (req.query.page - 1) * perpage;

    connection.query("SELECT id, name FROM `categories` WHERE translit = '" + req.params.cat_name + "'", function(err, cat) {
      if (err) throw err;

      var size = req.query.size ? " and items." + req.query.size + "=1 " : "";
      var brand = req.query.brand ? " and items.brend = " + req.query.brand + " " : "";
      var sort = req.query.sort ? "ORDER BY items.price " + req.query.sort : "ORDER BY items.id DESC";

      var query = "SELECT items.id, items.name, items.price, brends.name as brand, brend as brand_id, categories.name as subcat_name, items.translit, items.color, items.description, items.material, items.articul, items.s, items.m, items.l, items.xl, items.xxl, items.xxxl, items.xxxxl, items.date " +
          "FROM items, brends, categories " +
          "WHERE cat_id = '"+ cat[0].id +"' and items.brend = brends.id and items.view = 1 and items.subcat_id = categories.id "  + size + brand +
          //"ORDER BY items.id DESC LIMIT " + start_pos + ", " + perpage + "";
          sort;

      connection.query(query, function(err, rows) {
        if (err) throw err;

        for (var j = 0; j < rows.length; j++) {
          rows[j].size = '';
          if (rows[j].s) { rows[j].size += 'S, '}
          if (rows[j].m) { rows[j].size += 'M, ' }
          if (rows[j].l) { rows[j].size += 'L, ' }
          if (rows[j].xl) { rows[j].size += 'XL, ' }
          if (rows[j].xxl) { rows[j].size += 'XXL, ' }
          if (rows[j].xxxl) { rows[j].size += 'XXXL, ' }
          if (rows[j].xxxxl) { rows[j].size += 'XXXXL, ' }

          rows[j].size = rows[j].size.slice(0, -2);
        }
      
        
      //  response.writeHead(200, {"Access-Control-Allow-Origin": "*"});
        res.json(rows);
      });

    });
  });


  app.get('/api/items/subcategory/:subcat_name', function (req, res) {
    connection.query('SET NAMES utf8');
    var perpage = 10,
        start_pos = (req.query.page - 1) * perpage;

    connection.query("SELECT id, name FROM `categories` WHERE translit = '" + req.params.subcat_name + "'", function(err, cat) {
      if (err) throw err;

      var size = req.query.size ? " and items." + req.query.size + "=1 " : "";
      var brand = req.query.brand ? " and items.brend = " + req.query.brand + " " : "";
      var sort = req.query.sort ? "ORDER BY items.price " + req.query.sort : "ORDER BY items.id DESC";


      var query = "SELECT items.id, items.name, items.price, brends.name as brand, brend as brand_id, categories.name as subcat_name, items.translit, items.color, items.description, items.material, items.articul, items.s, items.m, items.l, items.xl, items.xxl, items.xxxl, items.xxxxl, items.date " +
          "FROM items, brends, categories " +
          "WHERE subcat_id = '"+ cat[0].id +"' and items.brend = brends.id and items.view = 1 and items.subcat_id = categories.id "  + size + brand +
          //"ORDER BY items.id DESC LIMIT " + start_pos + ", " + perpage + "";
          sort;

      connection.query(query, function(err, rows) {
        if (err) throw err;

        for (var j = 0; j < rows.length; j++) {
          rows[j].size = '';
          if (rows[j].s) { rows[j].size += 'S, '}
          if (rows[j].m) { rows[j].size += 'M, ' }
          if (rows[j].l) { rows[j].size += 'L, ' }
          if (rows[j].xl) { rows[j].size += 'XL, ' }
          if (rows[j].xxl) { rows[j].size += 'XXL, ' }
          if (rows[j].xxxl) { rows[j].size += 'XXXL, ' }
          if (rows[j].xxxxl) { rows[j].size += 'XXXXL, ' }

          rows[j].size = rows[j].size.slice(0, -2);
        }
        
      //  response.writeHead(200, {"Access-Control-Allow-Origin": "*"});
        res.json(rows);
      });

    });
  });




  app.get('/api/brands/:name', function (req, res) {
    connection.query('SET NAMES utf8');
    connection.query("SELECT id, p_id, type FROM `categories` WHERE translit = '" + req.params.name + "'", function(err, cat) {
      if (err) throw err;

      var id;
      if (cat[0].type == 'categories') {
        id = "cat_id='" + cat[0].id + "'";
      } else if(cat[0].type == 'types') {
        id = "subcat_id='" + cat[0].id + "'";
      }

      connection.query("SELECT DISTINCT(items.brend) as id, brends.name FROM items, brends WHERE " + id + " and items.brend = brends.id ORDER BY brends.id", function(err, brand) {
        if (err) throw err;
        res.json(brand);

      });
    });
  });


  app.get('/api/usefull_info/:id', function (req, res) {
    connection.query('SET NAMES utf8');


    connection.query('SELECT name, id, DATE_FORMAT(date,\'%d.%m.%Y\') AS date, description FROM news WHERE id = ' + req.params.id + '  ORDER BY reyt DESC', function(err, news) {
      if (err) throw err;  
      res.json(news[0]);
    });
  });


  app.get('/api/usefull_info', function (req, res) {
    connection.query('SET NAMES utf8');

    connection.query('SELECT id, name, DATE_FORMAT(date,\'%d.%m.%Y\') AS date, short_description FROM news WHERE view = 1 ORDER BY reyt DESC', function(err, news) {
      if (err) throw err;  
      res.json(news);
    });
  });




  app.get('/api/item/:id', function (req, res) {
    connection.query('SET NAMES utf8');
      var query = "SELECT items.id, items.name, items.price, brends.name as brand, brend as brand_id, categories.name as subcat_name, items.translit, items.color, items.description, items.material, items.articul, items.s, items.m, items.l, items.xl, items.xxl, items.xxxl, items.xxxxl, items.date " +
          "FROM items, brends, categories " +
          "WHERE items.id = '"+ req.params.id +"' and items.brend = brends.id and items.subcat_id = categories.id";

      connection.query(query, function(err, rows) {
        if (err) throw err;

        rows[0].size = '';
        if (rows[0].s) { rows[0].size += 'S, '}
        if (rows[0].m) { rows[0].size += 'M, ' }
        if (rows[0].l) { rows[0].size += 'L, ' }
        if (rows[0].xl) { rows[0].size += 'XL, ' }
        if (rows[0].xxl) { rows[0].size += 'XXL, ' }
        if (rows[0].xxxl) { rows[0].size += 'XXXL, ' }
        if (rows[0].xxxxl) { rows[0].size += 'XXXXL, ' }
        
        rows[0].size = rows[0].size.slice(0, -2);
        res.json(rows[0]);
      });
  });





  //app.use(fallback('index.html', { root: root }));
  http.createServer(app).listen(3000);
  console.log("Server has started.");
}


/*
var url = require("url");
var express = require('express');
var http = require('http');
//var config = require('config');
//var log = require('libs/log')(module);
var app = express();
var mysql = require('mysql');


function start() {
  //app.set('port', config.get('port'));
  app.set('port', 3000);
  http.createServer(app).listen(3000, function(){
    //http.createServer(app).listen(app.get('port'), function(){
    //log.info('Express is listening on port 3000');
  });

  var connection = mysql.createConnection({
    host:'193.169.189.215',
    port: '3306',
    user:'halatikc_two',
    password:'rtyujh_7N%',
    database:'halatikc_halatik'
  });

  connection.connect();

  app.get("/api/hello", function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  });
}*/

exports.start = start;