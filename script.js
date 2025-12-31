// ===== DOM要素の取得 =====
const form = document.getElementById('team-form');
const generateBtn = document.getElementById('generate-btn');
const resetBtn = document.getElementById('reset-btn');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const outputArea = document.getElementById('output');
const charCount = document.getElementById('char-count');

// フォーム入力要素
const inputs = {
  sport: document.getElementById('sport'),
  established: document.getElementById('established'),
  leader: document.getElementById('leader'),
  concept: document.getElementById('concept'),
  members: document.getElementById('members'),
  practice: document.getElementById('practice'),
  style: document.getElementById('style'),
  achievements: document.getElementById('achievements'),
  players: document.getElementById('players'),
  goals: document.getElementById('goals')
};

// ===== テキスト生成関数 =====
function generateIntroduction(data) {
  const parts = [];
  
  // 導入部（競技名と設立年）
  if (data.sport || data.established) {
    let intro = '';
    if (data.sport && data.established) {
      intro = `私たちは${data.established}に設立された${data.sport}チームです。`;
    } else if (data.sport) {
      intro = `私たちは${data.sport}を専門とするチームです。`;
    } else if (data.established) {
      intro = `私たちのチームは${data.established}に設立されました。`;
    }
    if (intro) parts.push(intro);
  }

  // リーダーシップ
  if (data.leader) {
    parts.push(`チームは${data.leader}のもとで運営されており、日々の活動に熱心に取り組んでいます。`);
  }

  // チームコンセプト
  if (data.concept) {
    parts.push(`${data.concept}という方針のもと、チーム一丸となって活動を続けています。この理念は、私たちの活動の根幹をなすものであり、すべてのメンバーが共有する価値観となっています。`);
  }

  // メンバー構成
  if (data.members) {
    parts.push(`現在、チームは${data.members}で構成されており、多様なバックグラウンドを持つメンバーが集まっています。それぞれが異なる強みを持ち寄り、チーム全体の力を高めています。`);
  }

  // 練習環境
  if (data.practice) {
    parts.push(`練習は${data.practice}で行っており、充実した環境の中で技術向上に励んでいます。定期的な練習を通じて、個々のスキルアップとチームワークの向上を図っています。`);
  }

  // プレースタイル・戦術
  if (data.style) {
    parts.push(`私たちのチームの最大の特徴は、${data.style}にあります。この独自のアプローチにより、試合では常に相手チームに対して優位性を保つことができています。`);
  }

  // 過去の実績
  if (data.achievements) {
    parts.push(`これまでに${data.achievements}といった素晴らしい成績を残してきました。これらの実績は、チームメンバー全員の努力と献身の結果であり、私たちの誇りでもあります。`);
  }

  // 選手のプロフィール
  if (data.players) {
    parts.push(`チームには${data.players}が在籍しており、それぞれが高い技術と豊富な経験を持っています。個々の選手の成長がチーム全体の躍進につながっており、互いに刺激し合いながら日々向上を目指しています。`);
  }

  // 今後の展望
  if (data.goals) {
    parts.push(`今後は${data.goals}を目標に掲げ、さらなる高みを目指していきます。チーム全員が一丸となって、この目標の実現に向けて全力で取り組んでまいります。私たちの挑戦はこれからも続きます。`);
  }

  // デフォルトメッセージ
  if (parts.length === 0) {
    return '少なくとも1つの項目に入力してください。入力内容に基づいて魅力的なチーム紹介文を生成します。';
  }

  // 段落を結合
  let text = parts.join('');
  
  // 文字数調整（800～1000文字を目指す）
  const currentLength = text.length;
  
  // 文字数が少ない場合、補足を追加
  if (currentLength < 800 && parts.length > 2) {
    const supplements = [];
    
    if (data.concept) {
      supplements.push(`このような活動理念のもと、私たちは日々練習に励み、技術の向上だけでなく、人間としての成長も大切にしています。`);
    }
    
    if (data.members || data.players) {
      supplements.push(`メンバー同士の絆も非常に強く、チームワークを何よりも重視しています。互いに支え合い、高め合う関係性が、私たちの強さの源泉です。`);
    }
    
    if (data.achievements || data.goals) {
      supplements.push(`これまでの経験を糧に、常に前を向いて挑戦を続けています。困難に直面しても、チーム全員で乗り越える力を持っています。私たちのチームは、単なる競技集団ではなく、共に成長し、夢を追いかける仲間の集まりです。`);
    }
    
    // 補足を適切な位置に挿入
    for (let i = 0; i < supplements.length && text.length < 900; i++) {
      text += supplements[i];
    }
  }
  
  // 文字数が多すぎる場合は調整（1000文字を超えないように）
  if (text.length > 1000) {
    text = text.substring(0, 997) + '...';
  }
  
  return text;
}

// ===== フォーム送信処理 =====
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // ボタンにローディング状態を追加
  const btnText = generateBtn.querySelector('span');
  const originalText = btnText.textContent;
  btnText.innerHTML = '<span class="spinner"></span> 生成中...';
  generateBtn.disabled = true;
  
  // 少し遅延を入れてスムーズな体験を提供
  setTimeout(() => {
    // フォームデータを収集
    const data = {};
    for (const [key, input] of Object.entries(inputs)) {
      const value = input.value.trim();
      if (value) {
        data[key] = value;
      }
    }
    
    // 紹介文を生成
    const introduction = generateIntroduction(data);
    
    // 出力エリアに表示
    outputArea.textContent = introduction;
    outputArea.classList.remove('empty');
    
    // 文字数をカウント
    const count = introduction.length;
    charCount.textContent = `文字数: ${count}`;
    
    // 800～1000文字の範囲内かチェック
    if (count >= 800 && count <= 1000) {
      charCount.classList.add('in-range');
    } else {
      charCount.classList.remove('in-range');
    }
    
    // コピーとクリアボタンを有効化
    copyBtn.disabled = false;
    clearBtn.disabled = false;
    
    // ボタンを元に戻す
    btnText.textContent = originalText;
    generateBtn.disabled = false;
    
    // トースト通知を表示
    showToast('✨ 紹介文を生成しました！');
    
    // 出力エリアまでスクロール（モバイル対応）
    setTimeout(() => {
      outputArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }, 800);
});

// ===== リセットボタン =====
resetBtn.addEventListener('click', () => {
  if (confirm('入力内容をすべてクリアしますか？')) {
    form.reset();
    showToast('🔄 フォームをリセットしました');
  }
});

// ===== コピーボタン =====
copyBtn.addEventListener('click', async () => {
  const text = outputArea.textContent;
  
  try {
    await navigator.clipboard.writeText(text);
    showToast('📋 クリップボードにコピーしました！');
    
    // ボタンのフィードバック
    const btnText = copyBtn.querySelector('span');
    const originalText = btnText.textContent;
    btnText.textContent = '✓ コピー完了';
    setTimeout(() => {
      btnText.textContent = originalText;
    }, 2000);
  } catch (err) {
    showToast('❌ コピーに失敗しました', 'error');
  }
});

// ===== クリアボタン =====
clearBtn.addEventListener('click', () => {
  if (confirm('生成された紹介文をクリアしますか？')) {
    outputArea.textContent = 'ここに生成された紹介文が表示されます';
    outputArea.classList.add('empty');
    charCount.textContent = '文字数: 0';
    charCount.classList.remove('in-range');
    copyBtn.disabled = true;
    clearBtn.disabled = true;
    showToast('🗑️ 紹介文をクリアしました');
  }
});

// ===== トースト通知 =====
function showToast(message, type = 'success') {
  // 既存のトーストを削除
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // 新しいトーストを作成
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // 3秒後に削除
  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== 入力フィールドのインタラクション =====
Object.values(inputs).forEach(input => {
  // フォーカス時のアニメーション
  input.addEventListener('focus', () => {
    input.parentElement.querySelector('.form-label').style.color = '#667eea';
  });
  
  input.addEventListener('blur', () => {
    input.parentElement.querySelector('.form-label').style.color = '';
  });
  
  // 自動リサイズ
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
  });
});

// ===== 初期化 =====
console.log('🚀 チーム紹介文ジェネレーターが起動しました');
