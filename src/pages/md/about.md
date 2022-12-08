## The "what?" 

**CSS data analysis** is a small hackathon research project, studying and visualizing CSS data throughout almost 3 years. CSS data is based on the components library, one of the crucial artifacts of Design System.

Data is collected with the help of [@projectwallace/css-analyzer](https://github.com/projectwallace/css-analyzer). CSS-analyzer versions have slightly different output over years, propagating changes to the data and inducing mapping for the final analysis.

This project is *merely a demonstration* of the accumulated data and not a tool of any kind, however some insights one can find helpful.

## The "why?"

The idea of processing CSS data fundamentally comes from the reason to track changes to the components library. That would include the basic parameters like *weight*, but more importantly not so evident [attributes like cohesion and selectors specificity](https://csswizardry.com/2016/06/improving-your-css-with-parker/) which reflect codebase *maintainability and performance*, especially in the long run.

On top of that we can easily get access to the *design properties* - colors, spacings and typography - which is particularly important on the legacy code analysis. On the fresh codebase this data helps to spot any maverick or redundant values as early as possible.

## The "how?"

Data alone is nothing but some numbers and pretty graphs. It comes with the *knowledge of the code* that produces it. If codebase (and respective data) grows it's not a bad thing per se, it is usually a matter of adding new features, design changes etc. On the other hand, when you can clearly see **anomaly**, it's a good start for investigation.

Of course, dealing only with anomalies as consequences is not proficient, simply put it might be too late. One of the tools that helps shaping CSS code on the fly is [Stylelint](https://stylelint.io/) - smart and configurable linter for CSS. Even without documented guidelines it can provide a lot of insights on what goes off in the code.

On the daily release basis tooling like [Speedcurve](https://www.speedcurve.com/), [Calibreapp](https://calibreapp.com/) or [Treo](https://treo.sh/) might be handy and informative, given that they consume your CSS in expected way. 
