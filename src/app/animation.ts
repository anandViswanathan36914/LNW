// Slide animation

// import {
//     trigger,
//     animate,
//     style,
//     group,
//     animateChild,
//     query,
//     stagger,
//     transition,
//   } from "@angular/animations";
  
//   export const myAnimation = trigger("myAnimation", [
//     transition("* <=> *", [
//       query(":enter, :leave", style({ position: "fixed", width: "100%" }), {
//         optional: true,
//       }),
//       group([
//         // block executes in parallel
//         query(
//           ":enter",
//           [
//             style({ transform: "translateX(100%)" }),
//             animate("0.5s ease-in-out", style({ transform: "translateX(0%)" })),
//           ],
//           { optional: true }
//         ),
//         query(
//           ":leave",
//           [
//             style({ transform: "translateX(0%)" }),
//             animate(
//               "0.5s ease-in-out",
//               style({ transform: "translateX(-100%)" })
//             ),
//           ],
//           { optional: true }
//         ),
//       ]),
//     ]),
//   ]);
  
  // fade in fade out

  import {
    trigger,
    animate,
    transition,
    style,
    query,
  } from "@angular/animations";
  
  export const myAnimation = trigger("myAnimation", [
    transition("* => *", [
      query(":enter", [style({ opacity: 0 })], { optional: true }),
  
      query(
        ":leave",
        [style({ opacity: 1 }), animate("0.3s", style({ opacity: 0 }))],
        { optional: true }
      ),
  
      query(
        ":enter",
        [style({ opacity: 0 }), animate("0.3s", style({ opacity: 1 }))],
        { optional: true }
      ),
    ]),
  ]);