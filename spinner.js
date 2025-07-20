// 讀取捷運站資料
import metroColors from '../assets/metro-colors.json';

const stations = [
  // 中和新蘆線
  "南勢角","景安","永安市場","頂溪","古亭","東門","忠孝新生","松江南京","行天宮",
  "中山國小","民權西路","大橋頭","台北橋","菜寮","三重","先嗇宮","頭前庄","新莊",
  "輔大","丹鳳","迴龍","三重國小","三和國中","徐匯中學","三民高中","蘆洲",
  // 板南線
  "頂埔","永寧","土城","海山","亞東醫院","府中","板橋","新埔","江子翠","龍山寺",
  "西門","台北車站","善導寺","忠孝新生","忠孝復興","忠孝敦化","國父紀念館","市政府",
  "永春","後山埤","昆陽","南港","南港展覽館",
  // 環狀線
  "大坪林","十四張","秀朗橋","景平","景安","中和","橋和","中原","板新","板橋",
  "新埔民生","頭前庄","幸福","新北產業園區",
  // 淡水信義線
  "淡水","紅樹林","竹圍","關渡","忠義","復興崗","北投","奇岩","唭哩岸","石牌",
  "明德","芝山","士林","劍潭","圓山","民權西路","雙連","中山","台北車站","台大醫院",
  "中正紀念堂","東門","大安森林公園","大安","信義安和","台北101/世貿","象山",
  // 松山新店線
  "松山","南京三民","台北小巨蛋","南京復興","松江南京","中山","北門","西門","小南門",
  "中正紀念堂","古亭","台電大樓","公館","萬隆","景美","大坪林","七張","小碧潭",
  "新店區公所","新店",
  // 文湖線
  "動物園","木柵","萬芳社區","萬芳醫院","辛亥","麟光","六張犁","科技大樓","大安","忠孝復興",
  "南京復興","中山國中","松山機場","大直","劍南路","西湖","港墘","文德","內湖","大湖公園",
  "葫洲","東湖","南港軟體園區","南港展覽館",
  // 安坑輕軌
  "大坪林","十四張","象山新站（規劃中）",
  // 淡海輕軌
  "北新","竹圍","綜合體育館","崁頂","淡水行政中心","輕軌淡金北路口","行動公園","漁人碼頭（預定）",
  // 桃園機場捷運
  "台北車站","三重","新北產業園區","新莊副都心","泰山","泰山貴和","體育大學","長庚醫院",
  "林口","緊急停靠站","山鼻","坑口","機場第一航廈","機場第二航廈","機場第三航廈",
  "大園","橫山","領航","高鐵桃園站","桃園體育園區","興南","環北","老街溪","中壢車站"
];

const canvas = document.getElementById('spinner');
const ctx = canvas.getContext('2d');
const size = canvas.width;
const center = size / 2;
const sectors = stations.length;
const arc = (2 * Math.PI) / sectors;

let startAngle = 0;
let isSpinning = false;

// 畫轉盤
function drawWheel() {
  stations.forEach((station, i) => {
    const angle = startAngle + i * arc;
    const color = metroColors[i % metroColors.length];
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, center - 5, angle, angle + arc);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.save();
    ctx.translate(
      center + Math.cos(angle + arc / 2) * (center - 50),
      center + Math.sin(angle + arc / 2) * (center - 50)
    );
    ctx.rotate(angle + arc / 2 + Math.PI / 2);
    ctx.fillStyle = '#000';
    ctx.font = '14px sans-serif';
    ctx.fillText(station, -ctx.measureText(station).width / 2, 0);
    ctx.restore();
  });
}

// 旋轉動畫
function spin() {
  if (isSpinning) return;
  isSpinning = true;
  const spinTime = Math.random() * 3000 + 2000;
  const endAngle = startAngle + spinTime / 1000 * 10;
  const start = performance.now();
  function animate(now) {
    const elapsed = now - start;
    startAngle = endAngle * (elapsed / spinTime);
    ctx.clearRect(0, 0, size, size);
    drawWheel();
    if (elapsed < spinTime) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      displayResult();
    }
  }
  requestAnimationFrame(animate);
}

// 顯示選中結果
function displayResult() {
  const index =
    Math.floor(((2 * Math.PI - startAngle % (2 * Math.PI)) / arc)) %
    sectors;
  document.getElementById('result').textContent =
    '🎉 選中：' + stations[index];
}

// 初始化
drawWheel();
document.getElementById('spin-btn').addEventListener('click', spin);
