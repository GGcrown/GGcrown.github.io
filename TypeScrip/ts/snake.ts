module MySnake {
    //
    class Snake {
        // 容器对象
        private container: HTMLTableElement;
        // 蛇身
        bodies: Array<SnakeBody> = new Array();
        // 方向
        direction: MoveDirection;
        // 速度
        private speed: number = 250;
        // 是否已经暂停
        private isPaused: boolean = true;
        // 初始化行数
        private rowCount: number = 30;
        // 初始化列数
        private columnCount: number = 30;
        // 计时器
        private timer: number;

        /**
         * 构造函数初始化
         */
        constructor() {
            // 容器初始化
            this.container = <HTMLTableElement>document.getElementById("tbl");
            this.direction = Math.floor(Math.random() * 4);
            let x: number;
            let y: number;

            // 生成表格
            for (let i = 0; i < this.rowCount; i++) {
                // 在末尾添加行
                let _row = <HTMLTableRowElement>this.container.insertRow(-1);
                for (let j = 0; j < this.columnCount; j++) {
                    _row.insertCell(-1);
                }
            }
            // 随机产生蛇果
            for (let i = 0; i < 10; i++) {
                let x = Math.floor(Math.random() * this.columnCount);
                let y = Math.floor(Math.random() * this.rowCount);
                // console.log("3"+y);
                if (!Draw.isCellFilled(this.container, x, y)) {
                    (<HTMLTableCellElement>(<HTMLTableRowElement>this.container.rows[y]).cells[x]).style.background = "#ff0";
                }
            }

            // 随机产生蛇头
            while (true) {
                let x = Math.floor(Math.random() * this.columnCount);
                let y = Math.floor(Math.random() * this.rowCount);
                // console.log("2"+y);
                if (!Draw.isCellFilled(this.container, x, y)) {
                    (<HTMLTableCellElement>(<HTMLTableRowElement>this.container.rows[y]).cells[x]).style.background = "#999";
                    var _body = new SnakeBody();
                    _body.X = x;
                    _body.Y = y;
                    this.bodies.push(_body);
                    break;
                }
            }
            document.onkeydown = (e) => {
                // let _snak
                switch (e.keyCode | e.which | e.charCode) {
                    case 13:
                        // 回车
                        if (this.isPaused) {
                            this.Run();
                            this.isPaused = false;
                        } else {
                            // 没有暂停
                            this.Pause();
                            this.isPaused = true;
                        }
                        break;
                    case 37:
                        // 左箭头
                        // 阻止蛇头倒退走
                        if (this.direction == MoveDirection.Rigth) {
                            break;
                        }
                        this.direction = MoveDirection.Left;
                        break;
                    case 38:
                        // 上箭头
                        // 阻止蛇头倒退走
                        if (this.direction == MoveDirection.Down) {
                            break;
                        }
                        this.direction = MoveDirection.Up;
                        break;
                    case 39:
                        // 右箭头
                        // 阻止蛇头倒退走
                        if (this.direction == MoveDirection.Left) {
                            break;
                        }
                        this.direction = MoveDirection.Rigth;
                        break;
                    case 40:
                        // 下箭头
                        // 阻止蛇头倒退走
                        if (this.direction == MoveDirection.Up) {
                            break;
                        }
                        this.direction = MoveDirection.Down;
                        break;
                }

            };

        }

        Pause = function () {
            clearInterval(this.timer);
            this.isPaused = true;
            console.log("1-" + this.bodies);
            Draw.paint(this.bodies, this.container);
        };

        MoveNextStep = function () {
            if (Draw.checkNextStep(this.bodies, this.direction, this.columnCount, this.rowCount, this.container) == -1) {
                alert("游戏结束")
            } else if (Draw.checkNextStep(this.bodies, this.direction, this.columnCount, this.rowCount, this.container) == 1) {
                let newBody = Draw.getNextPosition(this.bodies, this.direction);
                this.bodies.unshift(newBody);
                this.GenerateFood();
                return;
            } else {
                let newBody = Draw.getNextPosition(this.bodies, this.direction);
                // 在数组头部加上节点
                this.bodies.unshift(newBody);
                // 移除数组尾部节点
                this.bodies.pop();
            }
        };

        Run = function () {
            let _snake = this;
            this.timer = setInterval(function () {
                Draw.erase(_snake.bodies, _snake.container);
                _snake.MoveNextStep();
                // console.log(_snake.x);
                // console.log(_snake.y);
                // console.log("2-" + _snake.x + _snake.y);
                console.log(_snake.bodies);
                Draw.paint(_snake.bodies, _snake.container)
            }, this.speed)
        };

        // 产生食物
        GenerateFood = function () {
            let x = Math.floor(Math.random() * this.columnCount);
            let y = Math.floor(Math.random() * this.rowCount);
            // console.log("1"+y);
            if (!Draw.isCellFilled(this.container, x, y)) {
                (<HTMLTableCellElement>(<HTMLTableRowElement>this.container.rows[y]).cells[x]).style.background = "#ff0";
            }
        }


    }


    window.onload = (e) => {
        // Run();
        let _snake = new Snake();
    }


}


