var top250 = {
    init: function () {
        this.isLoading = false;
        this.index = 0;
        this.top250s = $('#top250');
        this.main = $('main');
        this.section = $('section');
        this.loading = $('.loading');
        this.bind();
        this.start();
    }, bind: function () {
        var _this = this;
        _this.main.scroll(function () {
            if (_this.section.eq(0).height() - 100 <= _this.main.scrollTop() + _this.main.height()) {
                _this.start()
            }
        });

    }, start: function () {
        var _this = this;
        _this.loading.show();
        if (_this.isLoading) {
            return
        } else {
            _this.isLoading = true;
        }
        $.ajax({
            url: "http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a",
            type: "GET",
            data: {
                start: _this.index,
                count: 20
            },
            dataType: "jsonp"
        }).done(function (ret) {
            console.log(ret);
            _this.getData(ret);
            _this.index += 20;
        }).fail(function () {
            alert('数据获取错误，上报管理员');
        }).always(function () {
            _this.isLoading = false;
            _this.loading.hide();
        });
    }, getData: function (data) {
        var _this = this;
        data.subjects.forEach(function (movie) {
            var tpl = `<div class="item">
            <a href="http://www.baidu.com" id="httpa">
                <div class="order">
                    <img src="http://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp" alt="">
                </div>
                <div class="detail">
                    <h2 class="detail_names">肖申克的救赎</h2>
                    <div class=""><span class="detail_average">8.7</span>分 / <span class="detail_collect_count">274296</span>收藏
                    </div>
                    <div class=""><span class="detail_year">1972</span> / <span class="detail_genres">/ 剧情 / 犯罪</span>
                    </div>
                    <div class="">导演：<span class="detail_director">宫崎骏</span></div>
                    <div class="">主演：<span class="detail_actor">蒂姆·罗宾斯、摩根·弗里曼、鲍勃·冈顿</span></div>
                </div>
            </a>
        </div>`;
            // console.log(movie.directors);
            var $node = $(tpl);
            $node.find('#httpa').attr("href", movie.alt);
            $node.find('.detail .detail_names').text(movie.title);
            $node.find('.order img').attr("src", movie.images.small);
            $node.find('.detail .detail_average').text(movie.rating.average);
            $node.find('.detail .detail_genres').text(movie.genres.join(' / '));
            $node.find('.detail .detail_year').text(movie.year);
            $node.find('.detail .detail_collect_count').text(movie.collect_count);
            $node.find('.detail .detail_director').text(function () {
                var directorArr = [];
                movie.directors.forEach(function (item) {
                    directorArr.push(item.name)
                });
                return directorArr.join('、')
            });
            $node.find('.detail .detail_actor').text(function () {
                var actorArr = [];
                movie.casts.forEach(function (item) {
                    actorArr.push(item.name)
                });
                return actorArr.join('、')
            });
            _this.top250s.eq(0).append($node);
        })
    }
};
var usBOx = {
    init: function () {
        this.isLoading = false;
        this.container = $('.container');
        this.main = $('main');
        this.section = $('section');
        this.loading = $('.loading');
        this.start();
    }, start: function () {
        var _this = this;
        _this.loading.show();
        $.ajax({
            url: "http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a",
            type: "GET",
            dataType: "jsonp"
        }).done(function (ret) {
            console.log(ret);
            _this.getData(ret);
        }).fail(function () {
            alert('数据获取错误，上报管理员');
        }).always(function () {
            _this.loading.hide();
        });
    }, getData: function (data) {
        var _this = this;
        data.subjects.forEach(function (movie) {
            var tpl = `<div class="item">
            <a href="http://www.baidu.com" id="httpa">
                <div class="order">
                    <img src="http://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp" alt="">
                </div>
                <div class="detail">
                    <h2 class="detail_names">肖申克的救赎</h2>
                    <div class=""><span class="detail_average">8.7</span>分 / <span class="detail_collect_count">274296</span>收藏
                    </div>
                    <div class=""><span class="detail_year">1972</span> / <span class="detail_genres">/ 剧情 / 犯罪</span>
                    </div>
                    <div class="">导演：<span class="detail_director">宫崎骏</span></div>
                    <div class="">主演：<span class="detail_actor">蒂姆·罗宾斯、摩根·弗里曼、鲍勃·冈顿</span></div>
                </div>
            </a>
        </div>`;
            // console.log(movie.directors);
            var $node = $(tpl);
            $node.find('#httpa').attr("href", movie.alt);
            $node.find('.detail .detail_names').text(movie.title);
            $node.find('.order img').attr("src", movie.images.small);
            $node.find('.detail .detail_average').text(movie.rating.average);
            $node.find('.detail .detail_genres').text(movie.genres.join(' / '));
            $node.find('.detail .detail_year').text(movie.year);
            $node.find('.detail .detail_collect_count').text(movie.collect_count);
            $node.find('.detail .detail_director').text(function () {
                var directorArr = [];
                movie.directors.forEach(function (item) {
                    directorArr.push(item.name)
                });
                return directorArr.join('、')
            });
            $node.find('.detail .detail_actor').text(function () {
                var actorArr = [];
                movie.casts.forEach(function (item) {
                    actorArr.push(item.name)
                });
                return actorArr.join('、')
            });
            _this.container.eq(0).append($node);
        })
    }
};
var search = {
    init: function () {
        this.keyword='';
        this.search=$('#search');
        this.input = $('input');
        this.isLoading = false;
        this.index = 0;
        this.top250s = $('#top250');
        this.main = $('main');
        this.section = $('section');
        this.loading = $('.loading');
        this.bind();
        this.start();
    }, bind: function () {
        var _this = this;
        this.search.find('button').click(function () {
            _this.keyword=_this.input.val()
        });
        _this.main.scroll(function () {
            if (_this.section.eq(0).height() - 100 <= _this.main.scrollTop() + _this.main.height()) {
                _this.start()
            }
        });

    }, start: function () {
        var _this = this;
        _this.loading.show();
        if (_this.isLoading) {
            return
        } else {
            _this.isLoading = true;
        }
        $.ajax({
            url: "http://api.douban.com/v2/movie/search?q=apikey=0df993c66c0c636e29ecbb5344252a4a",
            data: {
                q:_this.keyword
            },
            dataType: "jsonp"
        }).done(function (ret) {
            console.log(ret);
            _this.getData(ret);
            _this.index += 20;
        }).fail(function () {
            alert('数据获取错误，上报管理员');
        }).always(function () {
            _this.isLoading = false;
            _this.loading.hide();
        });
    }, getData: function (data) {
        var _this = this;
        data.subjects.forEach(function (movie) {
            var tpl = `<div class="item">
            <a href="http://www.baidu.com" id="httpa">
                <div class="order">
                    <img src="http://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp" alt="">
                </div>
                <div class="detail">
                    <h2 class="detail_names">肖申克的救赎</h2>
                    <div class=""><span class="detail_average">8.7</span>分 / <span class="detail_collect_count">274296</span>收藏
                    </div>
                    <div class=""><span class="detail_year">1972</span> / <span class="detail_genres">/ 剧情 / 犯罪</span>
                    </div>
                    <div class="">导演：<span class="detail_director">宫崎骏</span></div>
                    <div class="">主演：<span class="detail_actor">蒂姆·罗宾斯、摩根·弗里曼、鲍勃·冈顿</span></div>
                </div>
            </a>
        </div>`;
            // console.log(movie.directors);
            var $node = $(tpl);
            $node.find('#httpa').attr("href", movie.alt);
            $node.find('.detail .detail_names').text(movie.title);
            $node.find('.order img').attr("src", movie.images.small);
            $node.find('.detail .detail_average').text(movie.rating.average);
            $node.find('.detail .detail_genres').text(movie.genres.join(' / '));
            $node.find('.detail .detail_year').text(movie.year);
            $node.find('.detail .detail_collect_count').text(movie.collect_count);
            $node.find('.detail .detail_director').text(function () {
                var directorArr = [];
                movie.directors.forEach(function (item) {
                    directorArr.push(item.name)
                });
                return directorArr.join('、')
            });
            $node.find('.detail .detail_actor').text(function () {
                var actorArr = [];
                movie.casts.forEach(function (item) {
                    actorArr.push(item.name)
                });
                return actorArr.join('、')
            });
            _this.top250s.eq(0).append($node);
        })
    }
};
var app = {
    init: function () {
        this.$menu = $('footer div');
        this.$section = $('section');
        this.bind();
        top250.init();
        usBOx.init();
        search.init();

    },
    bind: function () {
        var _this = this;
        this.$menu.on('click', function () {
                $(this).addClass('active').siblings().removeClass('active');
                _this.$section.eq($(this).index()).fadeIn().siblings().hide();
            }
        )
    }
};
app.init();