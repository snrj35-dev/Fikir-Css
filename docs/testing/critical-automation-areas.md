# Critical Automation Areas (Top 5)

1. Contract key integrity test
- `recipes.contract.mjs` -> `naming.contract.mjs` key referans bütünlüğü

2. Single class surface test
- Resolver referanslarının tamamı recipe layer selector setinde var mı?

3. Placeholder-free dist test
- Build sonrası `dist/fikir.css` içinde `{{...}}` kalmadığını doğrula

4. Layer prelude and block presence test
- `@layer reset, base, layouts, recipes, components, utilities;` var mı?
- Her layer bloğu dist'te mevcut mu?

5. Alias migration consistency test
- `alias-migration.json` içindeki canonical hedef class'lar selector map içinde gerçekten var mı?
