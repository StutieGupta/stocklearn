//"enable strict";

//background("black");
//text("Welcome to STOCK EDUCATOR", 30, 50)

angular.module("stockTicker", [])
    .controller('StockTickerController', ["$scope", function($scope) {
    class Player
    {
        constructor(number)
        {
            this.number = number;
            this.stock_quantities = $scope.stocks.reduce((obj, stock) => Object.assign(obj, {[stock]: 0}), {});
            this.money = 150000
            this.portfolio_value = 0;
        }
        
        compute_portfolio_value()
        {
            this.portfolio_value = 0;
            for (let stock of $scope.stocks)
                this.portfolio_value += $scope.stock_values[stock] * this.stock_quantities[stock];
//            this.portfolio_value = $scope.stocks.reduce((stock, money) =>
//                $scope.stock_values[stock] * this.stock_quantities[stock] / 100 + money, this.money);
        }
    }

    $scope.build_game = function(num_players)
    {
        $scope.stock_values = [];
        for (let stock of $scope.stocks)
            $scope.stock_values[stock] = 2500;
        
        $scope.players = [];
        for (let i = 0; i < num_players; ++i)
            $scope.players.push(new Player(i + 1));
    }
        
    $scope.formatted_stock_value = function(stock)
    {
        return ($scope.stock_values[stock])
    }
        
    $scope.buy_stock = function(player, stock)
    {
        let price = 1 * $scope.stock_values[stock];
        if (player.money > 0)
        {
            player.stock_quantities[stock] += 1;
            this.portfolio_value +=price
            player.money -= price;
            player.compute_portfolio_value();
        }
    }

    $scope.sell_stock = function(player, stock)
    {
        if (player.stock_quantities[stock] > 0)
        {
            player.stock_quantities[stock] -= 1;
            player.money += 1 * $scope.stock_values[stock];
            player.compute_portfolio_value();
        }
    }

    $scope.roll = function()
    {
        
        let stock = random_choice($scope.stocks);
        let amount = random_choice([15, 30, 50, 120, 70, 50, 100]);
        let action = random_choice(["dividend", 1, -1]);
        if (action === "dividend")
            pay_dividends(stock, amount);
        else
            change_stock_price(stock, amount * action);
        
        for (player of $scope.players)
            player.compute_portfolio_value();
    }
        
    function pay_dividends(stock, amount)
    {
        log_event(stock + " gave a dividend of " + "₹" + amount );
        if ($scope.stock_values[stock] < 100)
            return;
        for (player of $scope.players)
            player.money += player.stock_quantities[stock] * amount;
    }
    
    function change_stock_price(stock, amount)
    {
        log_event(stock + " is " + (amount > 0 ? "up" : "down") + " by " + "₹" + Math.abs(amount));
        $scope.stock_values[stock] += amount;
        if ($scope.stock_values[stock] >= 5000)
        {
            $scope.stock_values[stock] = 2500;
            for (player of $scope.players)
                player.stock_quantities[stock] *= 2;
        }
        else if ($scope.stock_values[stock] <= 0)
        {
            for (player of $scope.players)
                player.stock_quantities[stock] = 0;
            $scope.stock_values[stock] = 100;
        }
    }
        
    function log_event(event)
    {
        if ($scope.data.log.length >= 10)
            $scope.data.log.pop();
        $scope.data.log.unshift(event);
    }
        
    function random_choice(values)
    {
        return values[Math.floor(Math.random() * values.length)];
    }
        
    $scope.stocks = ["Infosys", "Reliance", "ICICI bank", "Titan", "Tata motors", "Sun pharma", "HDFC bank", "Nestle", "Airtel", "Britannia", "Bata India", "GAIL", "HCL tech", "Glenmark pharma", "Mindtree", "Coal India", "SAIL", "Adani ports"];
    $scope.players = [];
    $scope.data = {
        num_players: 1,
        log: [],
    };
  }]);