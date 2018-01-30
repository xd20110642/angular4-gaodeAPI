import { Component, OnInit } from '@angular/core';
// 声明一个全局变量AMap
declare var AMap: any;
@Component({
  selector: 'app-amap',
  templateUrl: './amap.component.html',
  styleUrls: ['./amap.component.css']
})
export class AmapComponent implements OnInit {
  public keywolrd: any;
  constructor() { }

  ngOnInit() {
    // //   实例化一个地图
    let map = new AMap.Map('container', {
      resizeEnable: true,
    });
    // //  设置我们需要的目标城市
    map.setCity("成都"); // 或者输入精度
    //  自定义一个标识(marker)
    let customMarker = new AMap.Marker({
      // 这个是在高德API里面的参考手册的基础类里面
      // 自定义偏移量
      offset: new AMap.Pixel(-14, -34), // 使用的是Pixel类
      // 这个是在高德API里面的参考手册的覆盖物里面
      //  自定义图标
      icon: new AMap.Icon({ // 复杂图标类
        // 设定图标的大小
        size: new AMap.Size(27, 36),
        // 图片地址
        imgae: 'http://webapi.amap.com/images/custom_a_j.png',
        imageOffset: new AMap.Pixel(-28, 0)// 相对于大图的取图位置
      })
    });
    //  添加地图插件：地图工具条
    map.plugin(['AMap.ToolBar'], () => {
      // 设置地位标记为自定义标
      let toolBar = new AMap.ToolBar({
        locationMarker: customMarker
      });
      //  添加插件
      map.addControl(new toolBar);
    });
    //  添加比例尺插件
    map.plugin(['AMap.Scale'], () => {
      //   初始化插件
      let scale = new AMap.Scale();
      //   加载插件
      map.addControl(new scale);
    });
    //  加载地图实景
    map.plugin(["AMap.MapType"], () => {
      let type = new AMap.MapType();
      map.addControl(type);
    });
    // //  加载鹰眼
    map.plugin(["AMap.OverView"], () => {
     let  view = new AMap.OverView({
       // 鹰眼是否展示
       visible: true,
       // 鹰眼是否展开
       isOpen:　true
     });
      map.addControl(view);
      // 调用方法 显示鹰眼窗口
      view.show();
    });
    // 添加定位
    map.plugin('AMap.Geolocation',  () => {
    let  geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           // 定位结果缓存0毫秒，默认：0
        convert: true,           // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        // 显示定位按钮，默认：true
        buttonPosition: 'LB',    // 定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,         //    定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        // 定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      // 加载插件
      map.addControl(geolocation);
      // 调用方法 获取用户当前的精确位置信息
      geolocation.getCurrentPosition();
      //  定时刷新位置
      geolocation.watchPosition(
        2
      );
      AMap.event.addListener(geolocation, 'complete', () => {
        console.log("定位成功");
      }); //  返回定位信息
      AMap.event.addListener(geolocation, 'error', () => {
        console.log("定位失败");
      });      // 返回定位出错信息
    });
  //   获取输入类的
    let  autoOptions = {
      input: 'tipinput'
    };
  //  加载输入类插件
    map.plugin('AMap.Autocomplete', () => {
     //  实例化
    let auto = new AMap.Autocomplete(autoOptions);
      // 加载插件
      map.addControl(auto);
    });
  // 加载收索类插件
    map.plugin('AMap.PlaceSearch', () => {
    //   实例化
      let placeSearch = new AMap.PlaceSearch({
        map: map
      });  // 构造地点查询类
    //   加载插件
      map.addControl(placeSearch);
    //  注册监听事件，当选中某条记录的时候就会触发
      AMap.event.addListener( new AMap.Autocomplete(autoOptions), "select", (e) => {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
      });

    });







  }


}
