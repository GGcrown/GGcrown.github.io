var MySnake;
(function (MySnake) {
    //
    var Snake = /** @class */ (function () {
        /**
         * 构造函数初始化
         */
        function Snake() {
            var _this = this;
            // 蛇身
            this.bodies = new Array();
            // 速度
            this.speed = 250;
            // 是否已经暂停
            this.isPaused = true;
            // 初始化行数
            this.rowCount = 30;
            // 初始化列数
            this.columnCount = 30;
            this.Pause = function () {
                clearInterval(this.timer);
                this.isPaused = true;
                console.log("1-" + this.bodies);
                MySnake.Draw.paint(this.bodies, this.container);
            };
            this.MoveNextStep = function () {
                if (MySnake.Draw.checkNextStep(this.bodies, this.direction, this.columnCount, this.rowCount, this.container) == -1) {
                    alert("游戏结束");
                }
                else if (MySnake.Draw.checkNextStep(this.bodies, this.direction, this.columnCount, this.rowCount, this.container) == 1) {
                    var newBody = MySnake.Draw.getNextPosition(this.bodies, this.direction);
                    this.bodies.unshift(newBody);
                    this.GenerateFood();
                    return;
                }
                else {
                    var newBody = MySnake.Draw.getNextPosition(this.bodies, this.direction);
                    // 在数组头部加上节点
                    this.bodies.unshift(newBody);
                    // 移除数组尾部节点
                    this.bodies.pop();
                }
            };
            this.Run = function () {
                var _snake = this;
                this.timer = setInterval(function () {
                    MySnake.Draw.erase(_snake.bodies, _snake.container);
                    _snake.MoveNextStep();
                    // console.log(_snake.x);
                    // console.log(_snake.y);
                    // console.log("2-" + _snake.x + _snake.y);
                    console.log(_snake.bodies);
                    MySnake.Draw.paint(_snake.bodies, _snake.container);
                }, this.speed);
            };
            // 产生食物
            this.GenerateFood = function () {
                var x = Math.floor(Math.random() * this.columnCount);
                var y = Math.floor(Math.random() * this.rowCount);
                // console.log("1"+y);
                if (!MySnake.Draw.isCellFilled(this.container, x, y)) {
                    this.container.rows[y].cells[x].style.background = "#ff0";
                }
            };
            // 容器初始化
            this.container = document.getElementById("tbl");
            this.direction = Math.floor(Math.random() * 4);
            var x;
            var y;
            // 生成表格
            for (var i = 0; i < this.rowCount; i++) {
                // 在末尾添加行
                var _row = this.container.insertRow(-1);
                for (var j = 0; j < this.columnCount; j++) {
                    _row.insertCell(-1);
                }
            }
            // 随机产生蛇果
            for (var i = 0; i < 10; i++) {
                var x_1 = Math.floor(Math.random() * this.columnCount);
                var y_1 = Math.floor(Math.random() * this.rowCount);
                // console.log("3"+y);
                if (!MySnake.Draw.isCellFilled(this.container, x_1, y_1)) {
                    this.container.rows[y_1].cells[x_1].style.background = "#ff0";
                }
            }
            // 随机产生蛇头
            while (true) {
                var x_2 = Math.floor(Math.random() * this.columnCount);
                var y_2 = Math.floor(Math.random() * this.rowCount);
                // console.log("2"+y);
                if (!MySnake.Draw.isCellFilled(this.container, x_2, y_2)) {
                    this.container.rows[y_2].cells[x_2].style.background = "#999";
                    var _body = new MySnake.SnakeBody();
                    _body.X = x_2;
                    _body.Y = y_2;
                    this.bodies.push(_body);
                    break;
                }
            }
            document.onkeydown = function (e) {
                // let _snak
                switch (e.keyCode | e.which | e.charCode) {
                    case 13:
                        // 回车
                        if (_this.isPaused) {
                            _this.Run();
                            _this.isPaused = false;
                        }
                        else {
                            // 没有暂停
                            _this.Pause();
                            _this.isPaused = true;
                        }
                        break;
                    case 37:
                        // 左箭头
                        // 阻止蛇头倒退走
                        if (_this.direction == MySnake.MoveDirection.Rigth) {
                            break;
                        }
                        _this.direction = MySnake.MoveDirection.Left;
                        break;
                    case 38:
                        // 上箭头
                        // 阻止蛇头倒退走
                        if (_this.direction == MySnake.MoveDirection.Down) {
                            break;
                        }
                        _this.direction = MySnake.MoveDirection.Up;
                        break;
                    case 39:
                        // 右箭头
                        // 阻止蛇头倒退走
                        if (_this.direction == MySnake.MoveDirection.Left) {
                            break;
                        }
                        _this.direction = MySnake.MoveDirection.Rigth;
                        break;
                    case 40:
                        // 下箭头
                        // 阻止蛇头倒退走
                        if (_this.direction == MySnake.MoveDirection.Up) {
                            break;
                        }
                        _this.direction = MySnake.MoveDirection.Down;
                        break;
                }
            };
        }
        return Snake;
    }());
    window.onload = function (e) {
        // Run();
        var _snake = new Snake();
    };
})(MySnake || (MySnake = {}));
//# sourceMappingURL=snake.js.map