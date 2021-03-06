describe('classes', function() {
  var classes = document.documentElement.className.split(' ');

  it('_version exists', function() {
    expect(Modernizr._version).to.not.be.equal(undefined);
  });

  it('_version did not add a class', function() {
    expect(document.documentElement.className).to.not.contain('_version');
  });

  it('all classes are lower case', function() {
    expect(document.documentElement.className).to.not.match(/[A-Z]/);
  });

  describe('everythings ship shape', function() {
    _.chain(classes)
      .filter()
      .sort()
      .forEach(function(name) {
        var result = name.indexOf('no-') === -1;
        name = name.replace(/no-/, '');
        it(name + ' is correctly ' + result + ' in the classes and object', function() {
          if (_.includes(name, '-')) {

            if (name.replace('-', '') in Modernizr) {
              name = name.replace('-', '');
              expect(Modernizr[name]).to.be.equal(result);
            } else {
              name = name.split(/-(.+)/); // split at first occurrence of '-'
              expect(Modernizr[name[0]]).to.not.be.equal(undefined);
              expect(!!Modernizr[name[0]][name[1]]).to.be.equal(result);
            }
          } else {
            var test = Modernizr[name];
            var modernizrResult = test instanceof Boolean ? test.valueOf() : !!test;
            expect(modernizrResult).to.be.equal(result);
          }
        });
      })
      .value();
  });
});
