// 蛇的身体
var MySnake;
(function (MySnake) {
    /**
     * 移动方向枚举类
     */
    var MoveDirection;
    (function (MoveDirection) {
        MoveDirection[MoveDirection["Up"] = 0] = "Up";
        MoveDirection[MoveDirection["Rigth"] = 1] = "Rigth";
        MoveDirection[MoveDirection["Down"] = 2] = "Down";
        MoveDirection[MoveDirection["Left"] = 3] = "Left";
    })(MoveDirection = MySnake.MoveDirection || (MySnake.MoveDirection = {}));
    /**
     * 蛇身体
     */
    var SnakeBody = /** @class */ (function () {
        function SnakeBody() {
        }
        return SnakeBody;
    }());
    MySnake.SnakeBody = SnakeBody;
})(MySnake || (MySnake = {}));
//# sourceMappingURL=snakeBody.js.map