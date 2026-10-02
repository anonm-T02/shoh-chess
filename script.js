const pieces = {
  king: {
    symbol: "♚", role: "KING / ASOSIY DONA", name: "Shoh", value: "Bebaho",
    desc: "Istalgan yo'nalishda bir katak yuradi. Shohingizni hujum ostida qoldirishingiz yoki hujum ostidagi katakka yurishingiz mumkin emas.",
    note: "↗ Shohni asrang. Ikki shoh yonma-yon tura olmaydi.",
    moves: [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
  },
  queen: {
    symbol: "♛", role: "QUEEN / ENG KUCHLI DONA", name: "Farzin", value: "9 ball",
    desc: "Gorizontal, vertikal va diagonal yo'nalishlarda istalgancha katak yuradi.",
    note: "↗ Farzin kuchli, lekin uni rejasiz xavfga qo'ymang.",
    rays: true, dirs: [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
  },
  rook: {
    symbol: "♜", role: "ROOK / TO'G'RI CHIZIQ", name: "Rux", value: "5 ball",
    desc: "Gorizontal yoki vertikal yo'nalishda istalgancha katak yuradi.",
    note: "↗ Ochiq chiziqlarda rux juda kuchli bo'ladi.",
    rays: true, dirs: [[-1,0],[1,0],[0,-1],[0,1]]
  },
  bishop: {
    symbol: "♝", role: "BISHOP / DIAGONAL", name: "Fil", value: "3 ball",
    desc: "Diagonal yo'nalishlarda istalgancha yuradi va doimo bir xil rangdagi kataklarda qoladi.",
    note: "↗ Fillar ochiq diagonallarda kuchayadi.",
    rays: true, dirs: [[-1,-1],[-1,1],[1,-1],[1,1]]
  },
  knight: {
    symbol: "♞", role: "KNIGHT / NOODATIY YURISH", name: "Ot", value: "3 ball",
    desc: "Ikki katak bir yo'nalishda va bir katak yon tomonga — L shaklida yuradi.",
    note: "↗ Ot boshqa donalar ustidan sakrab o'ta oladi.",
    moves: [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]
  },
  pawn: {
    symbol: "♟", role: "PAWN / OLDINGA", name: "Piyoda", value: "1 ball",
    desc: "Odatda bir katak oldinga yuradi; birinchi yurishda ikki katak yurishi mumkin. Diagonal bo'yicha raqib donasini oladi.",
    note: "↗ Oxirgi qatorga yetgan piyoda yangi donaga aylanishi mumkin.",
    moves: [[-1,0],[-2,0],[-1,-1],[-1,1]]
  }
};

const board = document.getElementById("demoBoard");
const tabs = document.querySelectorAll(".piece-tab");
const symbol = document.getElementById("pieceSymbol");
const role = document.getElementById("pieceRole");
const nameEl = document.getElementById("pieceName");
const value = document.getElementById("pieceValue");
const desc = document.getElementById("pieceDescription");
const note = document.getElementById("pieceNote");
const origin = [4,4];

function valid(r,c){ return r >= 0 && r < 8 && c >= 0 && c < 8; }

function getMoves(piece){
  const result = [];
  if(piece.rays){
    for(const [dr,dc] of piece.dirs){
      let r = origin[0]+dr, c = origin[1]+dc;
      while(valid(r,c)){
        result.push([r,c]);
        r += dr; c += dc;
      }
    }
  } else {
    for(const [dr,dc] of piece.moves){
      const r = origin[0]+dr, c = origin[1]+dc;
      if(valid(r,c)) result.push([r,c]);
    }
  }
  return result;
}

function renderBoard(key){
  const piece = pieces[key];
  const moves = getMoves(piece);
  board.innerHTML = "";
  for(let r=0;r<8;r++){
    for(let c=0;c<8;c++){
      const sq = document.createElement("div");
      sq.className = `square ${(r+c)%2===0 ? "light" : "dark"}`;
      if(r===origin[0] && c===origin[1]){
        sq.classList.add("origin");
        sq.textContent = piece.symbol;
      } else if(moves.some(([mr,mc]) => mr===r && mc===c)){
        sq.classList.add("move");
      }
      board.appendChild(sq);
    }
  }
}

function selectPiece(key){
  const p = pieces[key];
  symbol.textContent = p.symbol;
  role.textContent = p.role;
  nameEl.textContent = p.name;
  value.textContent = p.value;
  desc.textContent = p.desc;
  note.textContent = p.note;
  tabs.forEach(t => t.classList.toggle("active", t.dataset.piece === key));
  renderBoard(key);
}

tabs.forEach(t => t.addEventListener("click", () => selectPiece(t.dataset.piece)));
selectPiece("king");

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
  document.getElementById("nav").classList.remove("open");
}));

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) e.target.classList.add("visible");
  });
}, {threshold:.14});

document.querySelectorAll(".reveal").forEach(el => io.observe(el));
