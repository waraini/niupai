//导航
$('.navbar>li').hover(function(){
    $(this).addClass('nav-active').siblings().removeClass('nav-active');
}, function(){});
//图片轮播


var imgs=[
    'img/banner1.jpg',
    'img/banner2.jpg',
    'img/banner3.jpg'

];

//DOM内容加载后执行
$(()=>{
    var $ulImgs=$("#imgs");
var $ulIdxs=$("#indexs");
var LIWIDTH=parseFloat($("#container").css("width"));
$ulImgs.css("width",LIWIDTH*(imgs.length+2));
var strImgs='<li><img src="'+
    imgs.join('"></li><li><img src="')+'"></li>';
//再重复追加第一张图片
strImgs+=
`<li><img src="${imgs[0]}"></li>`;
$ulImgs.html(strImgs);
for(var i=0,str="";i<imgs.length;i++){
    str+="<li>"+"</li>";
}
$ulIdxs.html(str)
    .children(":first")
    .addClass("hover");
//自动轮播
var speed=500;//每次轮播的时间
var wait=3000;//每次轮播之间等待的时间
var timer=null;//保存一次性定时器的序号
var i=0;//保存当前显示的图片下标
function move(){
    timer=setTimeout(()=>{
        i++;
    //让$ulImgs的left在speed时间内，移动到-i*LIWIDTH
    $ulImgs.animate({left:-i*LIWIDTH},speed,
        ()=>{
        //防止i越界
        if(i==imgs.length){
        i=0;
        $ulImgs.css("left","")
    }
    //将$ulIdxs中的第i个li设置为hover,清除其兄弟的hover
    $ulIdxs.children(":eq("+i+")").addClass("hover").siblings().removeClass("hover");
    if(canMove)
    //才再次回调move启动下次
        move();
}
);},wait);
}
move();//启动第一次
var canMove=true;
//为id为slider的div添加鼠标进入和移出事件
$("#container").hover(
    ()=>{//this->div
    //停止一次性定时器
    clearTimeout(timer);
canMove=false;
},
()=>{canMove=true;move();}
);
//当鼠标进入index中的li时，滚动到指定的图片
$ulIdxs.on("mouseover","li:not(.hover)",e=>{
    i=$ulIdxs.children().index(e.target);
$ulImgs.stop(true).animate(
    {left:-i*LIWIDTH},speed,
    ()=>{
    $ulIdxs.children(":eq("+i+")").addClass("hover").siblings().removeClass("hover");
}
)
})
});

//新品推荐table切换
$('#newfood-span span').click(function() {
    var i = $(this).index();//下标第一种写法
    //var i = $('tit').index(this);//下标第二种写法
    $(this).addClass('bgc').siblings().removeClass('bgc');
    $('#newfood-tab ul').eq(i).show().siblings().hide();
});
