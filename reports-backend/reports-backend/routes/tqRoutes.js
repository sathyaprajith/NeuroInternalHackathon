const express = require("express");
const router = express.Router();
const path = require("path");
const classifyTQ = require("../helpers/tqClassifier");

// Load norms from local JSON file instead of MongoDB
const normsData = require(
  path.join(__dirname, "../../../Reports.iqnorms/Reports.iqnorms.json"),
);

router.post("/getAllTQScores", async (req, res) => {
  const { age, section, tests } = req.body;

  if (!age || !section || !Array.isArray(tests)) {
    return res.status(400).json({ error: "Missing or invalid input data" });
  }

  const results = [];

  const normalizeCanonicalName = (originalName) => {
    const lower = String(originalName || "").toLowerCase();
    if (
      ["digit_span", "digit span", "digitspan"].includes(
        lower.replace(/\s+/g, "_"),
      )
    ) {
      return "Digit_Span";
    }
    return originalName;
  };

  const getAliasCandidates = (name) => {
    const lower = String(name || "").toLowerCase();
    if (
      lower === "digit_span" ||
      lower === "digit span" ||
      lower === "digitspan"
    ) {
      return ["Digit_Span", "Digit Span", "DigitSpan"];
    }
    return [name];
  };

  for (const test of tests) {
    const { name, raw_score } = test;

    try {
      const candidates = getAliasCandidates(name);
      let doc = null;
      let usedName = name;

      for (const candidate of candidates) {
        doc = normsData.find(
          (d) =>
            Number(d.age) === parseInt(age) &&
            d.section === section &&
            d.name === candidate,
        );
        if (doc) {
          usedName = candidate;
          break;
        }
      }

      if (!doc) {
        results.push({
          name: normalizeCanonicalName(name),
          error: "Test not found",
        });
        continue;
      }

      const mapping = doc.mappings.find(
        (m) => Number(m.raw_score) === Number(raw_score),
      );
      if (!mapping) {
        // If raw score exceeds max, assign the highest available TQ
        const maxRawScore = Math.max(
          ...doc.mappings.map((m) => Number(m.raw_score)),
        );
        if (Number(raw_score) > maxRawScore) {
          const highestMapping = doc.mappings.find(
            (m) => Number(m.raw_score) === maxRawScore,
          );
          results.push({
            name: normalizeCanonicalName(usedName),
            raw_score,
            tq_score: highestMapping.tq_score,
          });
        } else {
          results.push({
            name: normalizeCanonicalName(usedName),
            error: "Raw score not found",
          });
        }
      } else {
        results.push({
          name: normalizeCanonicalName(usedName),
          raw_score,
          tq_score: mapping.tq_score,
        });
      }
    } catch (err) {
      results.push({
        name: normalizeCanonicalName(name),
        error: "Internal error",
      });
    }
  }

  res.json({ results });
});

router.get("/classify/:score", (req, res) => {
  const score = parseInt(req.params.score);

  if (isNaN(score)) {
    return res.status(400).json({ error: "Invalid TQ value" });
  }

  const { old } = classifyTQ(score);
  res.json({ tqValue: score, traditionalClassification: old });
});

module.exports = router;
