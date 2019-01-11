// 绘图对象
var MySnake;
(function (MySnake) {
    /**
     * 画图类
     */
    var Draw = /** @class */ (function () {
        function Draw() {
        }
        /**
         * 擦除蛇身
         * @param {Array<mysnnake.snakebody>} p_Bodises 蛇身体的集合
         * @param {HTMLTableElement} p_Table -游戏容器对象
         */
        Draw.erase = function (p_Bodises, p_Table) {
            for (var i = 0; i < p_Bodises.length; i++) {
                this.eraseDot(p_Bodises[i].X, p_Bodises[i].Y, p_Table);
            }
        };
        /**
         * 擦除点
         * @param {number} x 单元格行数
         * @param {number} y 单元格列数
         * @param {HTMLTableElement} p_Table
         */
        Draw.eraseDot = function (x, y, p_Table) {
            p_Table.rows[y].cells[x].style.background = "";
        };
        /**
         * 绘制蛇身
         * @param {Array<mysnnake.snakebody>} p_Bodies
         * @param {HTMLTableElement} p_Table
         */
        Draw.paint = function (p_Bodies, p_Table) {
            // console.log(p_Bodies);
            for (var i = 0; i < p_Bodies.length; i++) {
                // console.log(p_Table[i].x+" -->");
                this.paintDot(p_Bodies[i].X, p_Bodies[i].Y, p_Table);
            }
        };
        /**
         * 绘制点
         * @param {number} x 单元格行数
         * @param {number} y 单元格列数
         * @param {HTMLTableElement} p_Table
         */
        Draw.paintDot = function (x, y, p_Table) {
            p_Table.rows[y].cells[x].style.background = "#999";
        };
        /**
         * 检查下一节点的运行状态
         * @param {Array<mysnnake.snakebody>} p_Bodies 蛇身体的合集
         * @param {MySnnake.MoveDirection} p_Direction 运动方向
         * @param {number} p_ColumnCount 列的数量
         * @param {number} p_RowCount 行的数量
         * @param {HTMLTableElement} p_Table 游戏容器对象
         */
        Draw.checkNextStep = function (p_Bodies, p_Direction, p_ColumnCount, p_RowCount, p_Table) {
            var _NewBody = this.getNextPosition(p_Bodies, p_Direction);
            // 到达边界，游戏结束
            if (_NewBody.X < 0 || _NewBody.X >= p_ColumnCount || _NewBody.Y < 0 || _NewBody.Y >= p_RowCount) {
                return -1;
            }
            for (var i = 0; i < p_Bodies.length; i++) {
                // 碰到蛇身，游戏结束
                if (p_Bodies[i].X == _NewBody.X && p_Bodies[i].Y == _NewBody.Y) {
                    return -1;
                }
            }
            // 碰到食物
            // console.log("4-" + _NewBody.Y);
            if (this.isCellFilled(p_Table, _NewBody.X, _NewBody.Y)) {
                return 1;
            }
            // 空白继续运行
            return 0;
        };
        /**
         * 获得蛇头运行下一节点的坐标
         * @param {Array<mysnnake.snakebody>} p_Bodies 蛇身体集合
         * @param {MySnnake.MoveDirection} p_Direction 运动方向
         * @returns {MySnnake.SnakeBody}
         */
        Draw.getNextPosition = function (p_Bodies, p_Direction) {
            var x = p_Bodies[0].X;
            var y = p_Bodies[0].Y;
            if (p_Direction == MySnake.MoveDirection.Up) {
                y--;
            }
            else if (p_Direction == MySnake.MoveDirection.Rigth) {
                x++;
            }
            else if (p_Direction == MySnake.MoveDirection.Down) {
                y++;
            }
            else if (p_Direction == MySnake.MoveDirection.Left) {
                x--;
            }
            // 返回一个坐标
            var _NewBody = new MySnake.SnakeBody();
            _NewBody.X = x;
            _NewBody.Y = y;
            return _NewBody;
        };
        /**
         * 单元格是否被填充
         * @param {HTMLTableElement} p_Table 表格容器
         * @param {number} x 单元格的列数
         * @param {number} y 单元格的行数
         * @returns {boolean} 是否被填充
         */
        Draw.isCellFilled = function (p_Table, x, y) {
            // console.log(p_Table);
            // console.log(x + "" + y);
            if (p_Table.rows[y].cells[x].style.background == "") {
                return false;
            }
            return true;
        };
        return Draw;
    }());
    MySnake.Draw = Draw;
})(MySnake || (MySnake = {}));
//# sourceMappingURL=Draw.js.map</mysnnake.snakebody></mysnnake.snakebody></mysnnake.snakebody></mysnnake.snakebody>