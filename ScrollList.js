/**
 * Created by sens on 2017/2/14.
 */
function ScrollList($list, num, time, isfade) {  //滚动中奖记录配置 (列表, 显示条数, 延时, 滚动边缘淡化效果开关)
    this.num = num || 1;  //默认的显示条数 1
    this.time = time || 1000;  //默认的滚动延时 1000
    this.$list = $list || $('.sens-scroll');
    this.isfade = isfade !== false;  //默认的边缘淡化效果开关 true
    this.marginTop = $list.css('margin-top');
    this.height = $list.children(':first-child').outerHeight(true) || 0;
    this.isHover = false;
    var _self = this;
    this.$list.hover(
        function () {
            _self.isHover = true;
        }, function () {
            _self.isHover = false;
        }
    );
}
ScrollList.prototype.play = function () {
    var self = this;
    var child = self.$list.children(':first-child');
    var tempChildTop = parseInt(child.css('margin-top').replace(/[a-zA-Z]/g, '')) || 0;
    var tempChildBottom = parseInt(child.css('margin-bottom').replace(/[a-zA-Z]/g, '')) || 0;
    var scrollFar = (child.outerHeight() || 0) + Math.max(tempChildTop, tempChildBottom); //margin上下叠加，以最高值为实际距离
    var html = '<div style="overflow: hidden;height:'
        + (self.height * self.num) + 'px;'
        + 'margin-top:' + self.marginTop
        + '"></div>';
    var $box = $(html);
    self.$list.after($box);
    self.$list.appendTo($box);
    self.$list.css('margin-top', '0'); //把list的外间距转移给外层容器以避免无法隐藏list的头部
    self.$list.css('overflow', 'visible'); //list本身应该允许显示多行
    function scroll() {
        if(self.isHover){
            setTimeout(scroll, self.time+1000);
            return;
        }
        self.isfade ? self.$list.children(':first-child').fadeOut(1000) : void (0);
        self.$list.animate({'margin-top': '-=' + scrollFar + 'px'}, 1000, 'swing', function () {
            self.$list.children(':first-child').show().appendTo(self.$list);
            self.$list.css('margin-top', '+=' + scrollFar + 'px');
            setTimeout(scroll, self.time);
        });
    }
    setTimeout(scroll, self.time);
};
