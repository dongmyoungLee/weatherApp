$(document).ready(function(){
    var city = []; // 사용자가 클릭한 곳의 도시명을 순서대로 넣을공간(사용자가 좌측부터 클릭한다는 보장을 할 수 없기 때문 입니다. )
    var myKey = "809cb67386d6d1e46fbf0f73dd7a70ea";    
    var state_icon = "";

    var w_box = `
                <li>
                    <div class="top">
                        <div class="cur_icon"><i class="wi"></i></div>
                        <div class="info">
                            <p class="temp"><span>10</span>&nbsp;˚</p>
                            <h4>Cloud</h4>
                            <p><span class="city">NewYork</span>, &nbsp; <span class="nation">US</span></p>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="wind">
                            <i class="wi wi-strong-wind"></i>
                            <p><span>1.2</span>&nbsp;m/s</p>
                        </div>
                        <div class="humidity">
                            <i class="wi wi-humidity"></i>
                            <p><span>50</span>&nbsp;%</p>
                        </div>
                        <div class="cloud">
                            <i class="wi wi-cloudy"></i>
                            <p><span></span>&nbsp;%</p>
                        </div>
                    </div>
                </li>`;

    // 배열 데이터의 개수를 활용하여 각 도시별 날씨정보를 요청할 때 마다 받는다. 

    function w_info(){
        // 배열 데이터의 개수와는 상관없이 날씨의 개별 박스를 모두 제거
        $("#weather ul").empty();

        // 현재 시점에서 배열의 개수만큼 다시 반복하여 생성해라 (갱신 )
        for(i = 0; i<city.length; i++){
            $("#weather ul").append(w_box);
        }

         $("#weather li").each(function(e){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q="+city[e]+"&appid="+myKey,
                dataType: "JSON",
                success: function(data){
                    console.log(data);
                    console.log("현재 온도(˚C) : " + parseInt(data.main.temp - 273.15));
                    var temp = parseInt(data.main.temp - 273.15);
                    console.log("현재 습도(%) : " + data.main.humidity);
                    var humidity = data.main.humidity;
                    console.log("현재 날씨 : " + data.weather[0].main);
                    var weather = data.weather[0].main;
                    console.log("현재 풍속(m/s) : " + data.wind.speed);
                    var wind = data.wind.speed;
                    console.log("국가명 : " + data.sys.country);
                    var nation = data.sys.country;
                    console.log("도시명 : " + data.name);
                    var region = data.name;
                    console.log("구름의 양(%) : " + data.clouds.all);
                    var cloud = data.clouds.all;

                    // 텍스트로(weather의 데이터 : clear , rain , ...) 받아온 현재 날씨를 이미지 아이콘으로 변경 (클래스명을 구성하여 추가하기 위함)

                    if(weather == "Clear"){
                        state_icon = "wi-day-sunny";
                    }else if(weather == "Clouds"){
                        state_icon = "wi-cloudy";
                    }else if(weather == "Rain"){
                        state_icon = "wi-rain";
                    }else if(weather == "Snow"){
                        state_icon = "wi-snow";
                    }else if(weather == "Haze"){
                        state_icon = "wi-day-haze";
                    }else if(weather == "Drizzle"){
                        state_icon = "wi-day-fog";
                    }else if(weather == "Fog"){
                        state_icon = "wi-day-rain-mix";
                    }else if(weather == "Smoke"){
                        state_icon = "wi-smog";
                    }else if(weather == "Mist"){
                        state_icon = "wi-stars";
                    }



                    $("#weather li").eq(e).find(".cur_icon i").addClass(state_icon);
                    $("#weather li").eq(e).find(".temp span").text(temp);
                    $("#weather li").eq(e).find(".info h4").text(weather);
                    $("#weather li").eq(e).find(".city").text(region);
                    $("#weather li").eq(e).find(".nation").text(nation);
                    $("#weather li").eq(e).find(".wind span").text(wind);
                    $("#weather li").eq(e).find(".humidity span").text(humidity);
                    $("#weather li").eq(e).find(".cloud span").text(cloud);


                }

            });
        });
    }
        $(".cities button").click(function(){
            var $city_text =  $(this).text(); // 클릭한 곳의 텍스트 저장
            city.push($city_text);
            console.log(city);
            $(this).prop("disabled", true);
            w_info();
        });
        
        function search(){
            var $search_val = $("#search_box").val(); // get 방식.
            $("#search_box").val("");
            if($search_val.length < 1){ // 입력 값 이 없을 때
                alert("검색어를 입력 해 주세요.")
            }else{
                // 소문자 작성인지 또는 대문자 작성인지 모름 => 모든글자를 소문자로 변경함
                var $low_search = $search_val.toLowerCase();
                city.push($low_search);
                w_info();
                
            }
        }

        $(".search button").click(function(){
            search();
        });

        $(".search").keypress(function(e){
            var $keyCode = e.keyCode;
            if($keyCode == 13){
                search();
            }
        });

        // "현재 날씨 정보를 클릭 시" 데이터 갱신되게 만듬
        $("#user_select .title").click(function(){
            location.reload();
        });
});




// api.openweathermap.org/data/2.5/find?q=London&appid={API key}
// api.openweathermap.org/data/2.5/find?q=London&appid=809cb67386d6d1e46fbf0f73dd7a70ea
// 809cb67386d6d1e46fbf0f73dd7a70ea 
