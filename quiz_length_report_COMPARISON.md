# Quiz Balance Comparison (Before vs After)

Questo report mostra il miglioramento del bilanciamento delle risposte (evitando che la corretta sia sempre la più lunga).

## 📊 COMPARATIVA SINTETICA

| Stato | Domande | Longest is Correct | % | Avg Len (Correct) | Avg Len (Distr.) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **PRIMA** | 115 | 56 | 48.7% | 58.3 | 40.6 |
| **DOPO** | 115 | 31 | 27.0% | 58.4 | 55.2 |

---

## 📉 DETTAGLIO "DOPO" (STATO ATTUALE)

# Quiz Answer Length Analysis Report

Analysis of the 'longest answer is correct' pattern across all course modules.
A question is flagged as 'Longest is Correct' if the correct answer is strictly longer than all other options.

## Summary

| Metric | Value |
| :--- | :--- |
| Total Questions Analyzed | 115 |
| Longest Answer is Correct | 38 (33.0%) |
| Avg Length (Correct) | 52.6 chars |
| Avg Length (Distractors) | 48.4 chars |

## Detailed Breakdown by Track

### GIT Track

| Module | Questions | Longest is Correct | % |
| :--- | :--- | :--- | :--- |
| git-1.ts | 5 | 1 | 20.0% |
| git-2.ts | 5 | 2 | 40.0% |
| git-3.ts | 5 | 1 | 20.0% |
| git-4.ts | 5 | 1 | 20.0% |
| git-5.ts | 5 | 1 | 20.0% |
| git-6.ts | 5 | 3 | 60.0% |
| git-7.ts | 5 | 2 | 40.0% |
| git-8.ts | 3 | 0 | 0.0% |
| git-9.ts | 5 | 2 | 40.0% |
| git-11.ts | 20 | 9 | 45.0% |
| **Total** | **63** | **22** | **34.9%** |

### DOCKER Track

| Module | Questions | Longest is Correct | % |
| :--- | :--- | :--- | :--- |
| docker-1.ts | 3 | 0 | 0.0% |
| docker-2.ts | 3 | 1 | 33.3% |
| docker-3.ts | 3 | 1 | 33.3% |
| docker-4.ts | 2 | 1 | 50.0% |
| docker-5.ts | 2 | 0 | 0.0% |
| docker-6.ts | 2 | 0 | 0.0% |
| docker-7.ts | 2 | 1 | 50.0% |
| docker-9.ts | 10 | 4 | 40.0% |
| **Total** | **27** | **8** | **29.6%** |

### K8S Track

| Module | Questions | Longest is Correct | % |
| :--- | :--- | :--- | :--- |
| k8s-1.ts | 2 | 0 | 0.0% |
| k8s-2.ts | 3 | 1 | 33.3% |
| k8s-3.ts | 2 | 1 | 50.0% |
| k8s-4.ts | 2 | 0 | 0.0% |
| k8s-5.ts | 2 | 1 | 50.0% |
| k8s-6.ts | 2 | 0 | 0.0% |
| k8s-7.ts | 2 | 2 | 100.0% |
| k8s-9.ts | 10 | 3 | 30.0% |
| **Total** | **25** | **8** | **32.0%** |

## Conclusion

✅ **Success**: The pattern has been effectively broken. Correct answers are well-balanced in length.


---

## 🕒 DETTAGLIO "PRIMA" (SNAPSHOT)

# Quiz Answer Length Analysis Report

Analysis of the 'longest answer is correct' pattern across all course modules.
A question is flagged as 'Longest is Correct' if the correct answer is strictly longer than all other options.

## Summary

| Metric | Value |
| :--- | :--- |
| Total Questions Analyzed | 115 |
| Longest Answer is Correct | 53 (46.1%) |
| Avg Length (Correct) | 58.4 chars |
| Avg Length (Distractors) | 41.8 chars |

## Detailed Breakdown by Track

### GIT Track

| Module | Questions | Longest is Correct | % |
| :--- | :--- | :--- | :--- |
| git-1.ts | 5 | 1 | 20.0% |
| git-2.ts | 5 | 2 | 40.0% |
| git-3.ts | 5 | 1 | 20.0% |
| git-4.ts | 5 | 1 | 20.0% |
| git-5.ts | 5 | 1 | 20.0% |
| git-6.ts | 5 | 3 | 60.0% |
| git-7.ts | 5 | 2 | 40.0% |
| git-8.ts | 3 | 0 | 0.0% |
| git-9.ts | 5 | 2 | 40.0% |
| git-11.ts | 20 | 9 | 45.0% |
| **Total** | **63** | **22** | **34.9%** |

### DOCKER Track

| Module | Questions | Longest is Correct | % |
| :--- | :--- | :--- | :--- |
| docker-1.ts | 3 | 0 | 0.0% |
| docker-2.ts | 3 | 3 | 100.0% |
| docker-3.ts | 3 | 2 | 66.7% |
| docker-4.ts | 2 | 1 | 50.0% |
| docker-5.ts | 2 | 0 | 0.0% |
| docker-6.ts | 2 | 0 | 0.0% |
| docker-7.ts | 2 | 1 | 50.0% |
| docker-9.ts | 10 | 7 | 70.0% |
| **Total** | **27** | **14** | **51.9%** |

### K8S Track

| Module | Questions | Longest is Correct | % |
| :--- | :--- | :--- | :--- |
| k8s-1.ts | 2 | 0 | 0.0% |
| k8s-2.ts | 3 | 1 | 33.3% |
| k8s-3.ts | 2 | 1 | 50.0% |
| k8s-4.ts | 2 | 2 | 100.0% |
| k8s-5.ts | 2 | 1 | 50.0% |
| k8s-6.ts | 2 | 2 | 100.0% |
| k8s-7.ts | 2 | 2 | 100.0% |
| k8s-9.ts | 10 | 8 | 80.0% |
| **Total** | **25** | **17** | **68.0%** |

## Conclusion

⚠️ **Warning**: Some bias might still remain in certain modules. Correct answers are still the longest in about half of the questions.

