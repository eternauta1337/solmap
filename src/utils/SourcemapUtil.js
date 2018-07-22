const SourcemapUtil = {

  // See: https://github.com/ethereum/solidity/blob/develop/docs/miscellaneous.rst#source-mappings
  // for documentation on Solidity's sourcemaps.
  
  findInstructionNum(content, pos) {

    // Sweep back from pos looking for returns.
    // Remember where spaces are found.
    // When a return is found, read the instruction number.
    let prevChar = "";
    let spaceIdx = 1;
    let char = content.charAt(pos);
    while(pos !== 0 && prevChar !== "\n") {
      char = content.charAt(pos);
      if(char === " ") spaceIdx = pos;
      pos--;
      prevChar = content.charAt(pos - 1);
    }
    return parseInt(content.substring(pos, spaceIdx));
  },

  disassemblerRangeToInstructionRange(content, range) {
    const start = SourcemapUtil.findInstructionNum(content, range.start);
    const end = SourcemapUtil.findInstructionNum(content, range.end);
    return { start, end }
  },

  disassemblerRangeToSourceRange(content, range, srcmap) {

    const instructionRange = SourcemapUtil.disassemblerRangeToInstructionRange(content, range);

    // TODO: decompress srcmap
    console.log(`srcmap raw: ${srcmap}`);
    srcmap = SourcemapUtil.decompressSourcemap(srcmap);
    console.log(`srcmap decompressed: ${srcmap}`);
    
    // TODO: translate coord to src range

    // TODO: translate instruction range to source range

    return {
      start: 0,
      end: 100
    }
  },

  decompressSourcemap(srcmap) {
    
    // Compression:
    // 1:2:1;1:9:1;2:1:2;2:1:2;2:1:2
    // 1:2:1; :9  ;2:1:2;     ;
    // 1:2:1;:9;2:1:2;;
    
    // Sweep the compressed mappings and
    // build a new decompressed one.
    const mappings = srcmap.split(';');
    let lastMapping = mappings[0].split(':'); // 1st mapping assumed to always be decompressed
    const newMappings = [lastMapping];
    for(let i = 1; i < mappings.length; i++) {

      // Read next mapping.
      const mapping = mappings[i].split(':');
    
      // Push new mapping, completing entries if necessary.
      const newMapping = [];
      while(newMapping.length < 4) {
        const idx = newMapping.length;
        if(mapping.length <= idx) mapping.push('');
        newMapping[idx] = mapping[idx] === '' ? lastMapping[idx] : mapping[idx];
      }
      newMappings.push(newMapping.join(':'));
      lastMapping = newMapping;
    }

    return newMappings.join(';');
  }
}

module.exports = SourcemapUtil;
