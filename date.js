// 4 panels = 2 spreads (1 spread = left+right)
window.BOOK = {
  spreads: [
    {
      left: {
        kicker: "T.C.H",
        title: "BRAND BOOK",
        subtitle: "To. coffee haus",
        body:
`bean archive · recipe
100×150 · 4 panels

우리는 “선택”을 돕는 로스터리입니다.
조용하지만 분명하게,
매일의 커피를 더 쉽게 고르게 합니다.`,
        chips: ["Roastery", "Consulting", "Archive"]
      },
      right: {
        kicker: "BLEND",
        title: "BLENDS",
        subtitle: "5 signatures",
        body:
`T.C.H 블렌드는 “용도”가 먼저입니다.
— 매일 / 시그니처 / 디저트 / 다크 / 디카페인

추출이 어렵지 않고,
라벨만 봐도 선택이 쉬워야 합니다.`,
        chips: ["Easy to choose", "Easy to brew", "Clear taste"]
      }
    },

    {
      left: {
        kicker: "BLENDING BEANS",
        title: "5 BLENDS",
        subtitle: "line up",
        body: "각 블렌드는 목적이 명확합니다.\n(원산지/노트는 시즌에 따라 업데이트)",
        beanList: [
          { no:"NO.1", name:"DAILY", meta:"Brazil · Guatemala · Ethiopia" },
          { no:"NO.2", name:"SIGNATURE", meta:"Tanzania · Guatemala · Ethiopia" },
          { no:"NO.3", name:"SWEETNESS", meta:"Brazil · Guatemala · Colombia" },
          { no:"NO.4", name:"DARK", meta:"Brazil · Colombia" },
          { no:"NO.5", name:"DECAFFEINE", meta:"Brazil · Ethiopia" },
        ],
        chips: ["Daily", "Dessert", "Decaf"]
      },
      right: {
        kicker: "PARTNERS",
        title: "BENEFITS",
        subtitle: "for cafés",
        body:
`파트너 매장에 제공되는 기준(예시)

1) 월간 원두 업데이트(노트/레시피)
2) 메뉴/레시피 가이드(핸드드립/에스프레소)
3) QC & 추출 세팅 지원
4) 브랜딩/라벨/아카이브 페이지 제공

“같이 운영이 쉬워지는 방향”을 만듭니다.`,
        chips: ["Recipe support", "QC", "Brand materials"]
      }
    }
  ]
};
