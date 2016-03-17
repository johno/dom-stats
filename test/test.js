import test from 'ava'
import isPresent from 'is-present'
import fs from 'fs'
import domStats from '..'

test('should return the stats for an HTML string', t => {
  t.plan(4)

  domStats(fixture('furtive.html'), {}, (error, stats) => {
    t.ok(isPresent(stats))
    t.same(stats.tagCounts.p, 21)
    t.same(stats.tagCounts.li, 12)
    t.same(stats.tagCounts.video, 0)
  })
})

test('should skip zero counts if the option is passed', t => {
  t.plan(1)

  domStats(fixture('furtive.html'), { ignoreZeroCounts: true }, (error, stats) => {
    t.same(stats.tagCounts.video, undefined)
  })
})

test('should return id statistics', t => {
  t.plan(3)

  domStats(fixture('furtive.html'), {}, (error, stats) => {
    t.same(stats.duplicateIds, ['grid'])
    t.same(stats.duplicateIdsCount, 1)
    t.same(stats.totalIds, 17)
  })
})

test('should return class statistics', t => {
  t.plan(2)

  domStats(fixture('furtive.html'), {}, (error, stats) => {
    t.same(stats.totalClasses, 415)
    t.same(Math.round(stats.averageClassCount), 2)
  })
})

function fixture(name) {
  return fs.readFileSync('fixtures/' + name, 'utf8').trim()
}
