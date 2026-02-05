const fs = require('fs');
const path = require('path');

// new-all-members.jsonを読み込む
const allMemberPath = path.join(__dirname, '../public/data/new-all-members.json');
const allMemberData = JSON.parse(fs.readFileSync(allMemberPath, 'utf8'));

// タイム文字列を秒に変換する関数
// 新形式: "14:39.97" (分:秒.ミリ秒) または "1:04:23" (時:分:秒)
function parseTimeToSeconds(timeStr) {
  if (!timeStr) return Infinity;
  
  const parts = timeStr.split(':');
  
  // ハーフマラソンのフォーマット: "1:04:23" (時:分:秒)
  if (parts.length === 3) {
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    return hours * 3600 + minutes * 60 + seconds;
  }
  
  // 通常のフォーマット: "14:39.97" (分:秒.ミリ秒)
  if (parts.length === 2) {
    const minutes = parseInt(parts[0], 10);
    const secondsParts = parts[1].split('.');
    const seconds = parseInt(secondsParts[0], 10);
    const centiseconds = secondsParts[1] ? parseInt(secondsParts[1], 10) : 0;
    return minutes * 60 + seconds + centiseconds / 100;
  }
  
  return Infinity;
}

// タイム形式を変換する関数
// "14:09.39" → "14'09\"39"
// "1:10:21" → "1:10'21"
function formatTime(timeStr) {
  if (!timeStr) return timeStr;
  
  const parts = timeStr.split(':');
  
  // ハーフマラソンのフォーマット: "1:10:21" → "1:10'21"
  if (parts.length === 3) {
    return `${parts[0]}:${parts[1]}'${parts[2]}`;
  }
  
  // 通常のフォーマット: "14:09.39" → "14'09\"39"
  if (parts.length === 2) {
    const minutes = parts[0];
    const secondsParts = parts[1].split('.');
    const seconds = secondsParts[0];
    const centiseconds = secondsParts[1] || '0';
    return `${minutes}'${seconds}"${centiseconds}`;
  }
  
  return timeStr;
}

// 種目ごとにデータを抽出
function extractEventRecords(members, eventName) {
  const records = [];
  
  for (const member of members) {
    const personalBest = member.personalBests.find(pb => pb.event === eventName);
    if (personalBest) {
      records.push({
        fullName: member.fullName,
        highSchool: member.highSchool,
        time: formatTime(personalBest.time),
        _seconds: parseTimeToSeconds(personalBest.time)
      });
    }
  }
  
  // タイム順にソート（速い順）
  records.sort((a, b) => a._seconds - b._seconds);
  
  // 順位を追加し、_secondsを削除
  return records.map((record, index) => ({
    rank: index + 1,
    fullName: record.fullName,
    highSchool: record.highSchool,
    time: record.time
  }));
}

// 各種目のマッピング（5000m, 10000m, Half Marathonのみ）
const eventMappings = [
  { event: '5000m', filename: '5000m.json' },
  { event: '10000m', filename: '10000m.json' },
  { event: 'Half Marathon', filename: 'half-marathon.json' }
];

const outputDir = path.join(__dirname, '../public/data/records');

// 出力ディレクトリが存在することを確認
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 各種目のランキングを生成
for (const mapping of eventMappings) {
  const records = extractEventRecords(allMemberData.members, mapping.event);
  
  if (records.length > 0) {
    const outputData = {
      event: mapping.event,
      records: records
    };
    
    const outputPath = path.join(outputDir, mapping.filename);
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf8');
    console.log(`Generated ${mapping.filename} with ${records.length} records`);
  } else {
    console.log(`No records found for ${mapping.event}`);
  }
}

console.log('\nRanking generation completed!');
